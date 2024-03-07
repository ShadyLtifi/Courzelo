package tn.esprit.devflow.courzelo.services;

import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.Config.JwtIssuer;
import tn.esprit.devflow.courzelo.Config.UserPrincipal;
import tn.esprit.devflow.courzelo.USER.LoginResponce;
import tn.esprit.devflow.courzelo.USER.Registre;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.repository.UserRepository;


import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepo;

    private final String url = "http://localhost:8080";


    public LoginResponce attemtptLogin(String email, String password){
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email,password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var principal =(UserPrincipal)authentication.getPrincipal();
        var roles = principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        var token = jwtIssuer.issue( principal.getUserId(),principal.getEmail(),roles);
        return LoginResponce.builder()
                .accessToken(token)
                .build();
    }

    public void registerUser(Registre register) {
        if (userRepo.findByEmail(register.getEmail()) != null) {
            throw new RuntimeException("Username is taken!");
        }
        User user = new User();
        user.setNom(register.getNom());
        user.setPrenom(register.getPrenom());
        user.setCin(register.getCin());
        user.setUsername(register.getUsername());
        user.setDateN(register.getDateN());
        user.setEmail(register.getEmail());
        user.setPassword(passwordEncoder.encode(register.getPassword()));
        user.setRole(register.getRole());

        String token = generateVerificationToken();

        System.out.println(user);
        userRepo.save(user);
    }

    private String generateVerificationToken() {
        return UUID.randomUUID().toString();
    }



    public void resetPassword(String email, String password) {
        User u = userRepo.findByEmail(email);
        System.out.println(email);
        if (u != null) {
            u.setPassword(passwordEncoder.encode(password));
            System.out.println("done");
            userRepo.save(u);
        } else {
            try {
                throw new NotFoundException("User not found with email: " + email);
            } catch (NotFoundException e) {
                throw new RuntimeException(e);
            }
        }
    }


    public boolean isOldPasswordCorrect(String email, String oldPass) {
        User user = userRepo.findByEmail(email);
        if (user != null) {
            return passwordEncoder.matches(oldPass, user.getPassword());
        } else {
            return false;
        }
    }


    public void lastLogin(String email){
        User u = userRepo.findByEmail(email);
        u.setLastLogin(LocalDate.now());
        userRepo.save(u);
    }


}

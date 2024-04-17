package tn.esprit.devflow.courzelo.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.errors.InvalidCredentials;
import tn.esprit.devflow.courzelo.errors.UserNotFoundException;
import tn.esprit.devflow.courzelo.model.LoginRequest;
import tn.esprit.devflow.courzelo.model.LoginResponce;
import tn.esprit.devflow.courzelo.model.RegisterDto;
import tn.esprit.devflow.courzelo.repository.UserRepository;
import tn.esprit.devflow.courzelo.security.JwtIssuer;
import tn.esprit.devflow.courzelo.security.JwtTokenUtil;
import tn.esprit.devflow.courzelo.services.AuthService;
import tn.esprit.devflow.courzelo.services.EmailService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final EmailService emailService;


    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody @Validated LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new InvalidCredentials("Invalid username/password supplied");
        }

        final UserDetails userDetails = authService.loadUserByUsername(loginRequest.getUsername());
        final String token = JwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new LoginResponce(token));
    }






    @PostMapping("/auth/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDto registerDto) {
        User user = userRepo.findByEmail(registerDto.getEmail());
        if (user != null) {
            throw new UserNotFoundException("User exist by that email");
        }
        authService.registerUser(registerDto);
        emailService.sendCodeByMail(registerDto.getEmail());
        return ResponseEntity.ok("User registered successfully");
    }



    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("verificationToken") String verificationToken) {
        if (validateVerificationToken(verificationToken)) {
            return ResponseEntity.ok("User verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid verification token");
        }
    }

    private boolean validateVerificationToken(String verificationToken) {
        User u = userRepo.findByVerificationToken(verificationToken);
        if (u.getVerificationToken().equals(verificationToken)) {
            if (u.getEnabled()) {
                return true;
            }else if(!u.getEnabled()){
                u.setEnabled(true);
                userRepo.save(u);
                return true;
            }
        }
        return false;
    }
}

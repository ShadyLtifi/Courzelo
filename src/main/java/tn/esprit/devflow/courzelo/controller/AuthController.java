package tn.esprit.devflow.courzelo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import tn.esprit.devflow.courzelo.Config.JwtIssuer;
import tn.esprit.devflow.courzelo.USER.LoginRequest;
import tn.esprit.devflow.courzelo.USER.LoginResponce;
import tn.esprit.devflow.courzelo.USER.Registre;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.errors.InvalidCredentials;
import tn.esprit.devflow.courzelo.errors.UserNotEnabled;
import tn.esprit.devflow.courzelo.errors.UserNotFoundException;
import tn.esprit.devflow.courzelo.repository.UserRepository;
import tn.esprit.devflow.courzelo.services.AuthService;


@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final AuthService authService;


    @CrossOrigin()
    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponce> login(@RequestBody @Validated LoginRequest request) {
        if (request.getEmail() == null || request.getEmail().isEmpty() ||
                request.getPassword() == null || request.getPassword().isEmpty()) {
            System.out.println("Email and password are required");
            return ResponseEntity.badRequest().build();
        }
        User user = userRepo.findByEmail(request.getEmail());
        if (user == null) {
            throw new UserNotFoundException("User not found by email");
        }
        if (!user.getEnabled()) {
            throw new UserNotEnabled("User is not authorized");
        }
        try {
            LoginResponce loginResponse = authService.attemtptLogin(request.getEmail(), request.getPassword());
            authService.lastLogin(request.getEmail());
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            // Catch the specific exception and rethrow it as InvalidCredentials
            throw new InvalidCredentials("Invalid credentials: " + e.getMessage());
        }
    }



        @PostMapping("/auth/register")
    public ResponseEntity<String> registerUser(@RequestBody Registre register) {
        User user = userRepo.findByEmail(register.getEmail());
        if (user != null) {
            throw new UserNotFoundException("User exist by that email");
        }
        authService.registerUser(register);
        return ResponseEntity.ok("User registered successfully");
    }



    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("token") String verificationToken) {
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

package tn.esprit.devflow.courzelo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.StaticUser;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {
    private List<StaticUser> users = new ArrayList<>();

    public LoginController() {
        // Initialiser la liste avec quelques utilisateurs statiques
        users.add(new StaticUser("user123", "John Doe", "john.doe@example.com", "1234"));
        users.add(new StaticUser("user124", "Jane Doe", "jane.doe@example.com", "abcd"));
        // Ajoutez d'autres utilisateurs au besoin
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody StaticUser loginUser) {
        // Chercher un utilisateur correspondant dans la liste
        for (StaticUser user : users) {
            if (user.getEmail() != null && user.getEmail().equals(loginUser.getEmail()) &&
                    user.getPassword() != null && user.getPassword().equals(loginUser.getPassword())) {
                // Utilisateur trouvé et les identifiants correspondent
                System.out.println("Login successful for user: " + loginUser.getEmail());
                // Vous pouvez choisir de retourner un nouvel objet sans le mot de passe pour des raisons de sécurité
                StaticUser loggedInUser = new StaticUser(user.getId(), user.getName(), user.getEmail(), null);
                return ResponseEntity.ok(loggedInUser);
            }
        }

        // Si aucun utilisateur correspondant n'a été trouvé ou si les identifiants ne correspondent pas
        System.out.println("Login failed for user: " + loginUser.getEmail());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }



}

package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.services.IUserService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    @Autowired
    private IUserService iuserService;

    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
        return iuserService.createUser(user);
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return iuserService.getUserByEmail(email);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return iuserService.getAllUsers();
    }

    @PutMapping("/update/{email}")
    public User updateUser(@PathVariable String email, @RequestBody User user) {
        return iuserService.updateUser(email, user);
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        iuserService.deleteUser(email);
        return ResponseEntity.noContent().build();
    }
}

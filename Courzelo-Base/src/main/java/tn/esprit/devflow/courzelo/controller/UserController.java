package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.UserDTO;
import tn.esprit.devflow.courzelo.services.IUserService;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private IUserService iuserService;

    @PostMapping("/public/register")
    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO userDTO) {
        UserDTO createdUser = iuserService.createUser(userDTO);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        UserDTO userDTO = iuserService.getUserByEmail(email);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = iuserService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<Void> updateUser(@PathVariable String email, @RequestBody UserDTO userDTO) {
        iuserService.updateUser(email, userDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        iuserService.deleteUser(email);
        return ResponseEntity.noContent().build();
    }
}

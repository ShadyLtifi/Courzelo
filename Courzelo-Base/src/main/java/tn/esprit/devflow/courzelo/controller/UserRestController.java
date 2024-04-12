package tn.esprit.devflow.courzelo.controller;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;
import tn.esprit.devflow.courzelo.entity.Roles;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.errors.PasswordDoesNotMatchTheOld;
import tn.esprit.devflow.courzelo.errors.UserNotFoundException;
import tn.esprit.devflow.courzelo.model.ChangePasswordRequest;
import tn.esprit.devflow.courzelo.repository.UserRepository;
import tn.esprit.devflow.courzelo.services.AuthService;
import tn.esprit.devflow.courzelo.services.IUserService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
@RequestMapping("UserRestController")
public class UserRestController {
    @Autowired
    IUserService iUserService ;
    @Autowired
    private final AuthService authService;
    @Autowired
    private final UserRepository userRepo;

    @GetMapping("findUserByEmail/{email}")
    User getUserByEmail(@PathVariable("email") String email){
        return iUserService.findByEmail(email);
    }


    @PutMapping("updateUser")
    User editUser( @RequestBody User user){
        return iUserService.updateUser(user);
    }

    @PutMapping("/change-password")
    public void changePassword(@RequestBody ChangePasswordRequest request) {
        if (request.getEmail() == null ||
                request.getOldPass().isEmpty() ||
                request.getNewPass() == null) {
            System.out.println("Email, old password, and new password are required");
        }

        if (!authService.isOldPasswordCorrect(request.getEmail(), request.getOldPass())) {
            throw new PasswordDoesNotMatchTheOld("The entered old password does not match the current password");
        }
        String subject = "Password Change Notification";
        String body = "Your password has been changed.\n if it wasnt u, \n Click http://localhost:4200/reset-password/" + request.getEmail() + " to change your password.";
        iUserService.changePassword(request.getEmail(), request.getOldPass(), request.getNewPass());
    }

    @PutMapping("/reset-password/{email}")
    public ResponseEntity<String> resetPassword(@PathVariable("email") String email, @RequestParam String password) {
        try {
            authService.resetPassword(email, password);
            return ResponseEntity.ok("Password reset successfully");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }



    @PutMapping("toggelUser")
    User enableOrDisable( @RequestParam String email){
        return iUserService.enableOrDisable(email);
    }


    @GetMapping("SendEmail")
    public void sendEmail(@RequestParam("email") String email) {
        User user = iUserService.findByEmail(email);
        if (user.getId() == null) {
            throw new UserNotFoundException("User not found by the provided email");
        } else {
            String subject = "Rest your password";
            String body = "Click on the lick below to rest your password \n http://localhost:4200/reset-password/" + email;
        }

    }
        @PostMapping("/uploadImg/{idUser}")
    public User addImg(@RequestParam("file") MultipartFile file , @PathVariable("idUser") String idUser) {

        User user = userRepo.findUserById(idUser);
        System.out.println("OK");

            userRepo.save(user);
            return user;
    }

    @GetMapping("/allusers")
    @ResponseBody
    public List<User> retrievealluser (){
        return iUserService.retrieveAllUser();
    }


    @GetMapping("/getRoleByUsername/{username}")
    @ResponseBody
    Roles getRoleUserByUsername(@PathVariable("username") String username){
        return iUserService.getRoleByUsername(username);
    }
}

package tn.esprit.devflow.courzelo.services;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.devflow.courzelo.entity.Roles;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.repository.UserRepository;
import tn.esprit.devflow.courzelo.security.JwtTokenUtil;

import java.time.LocalDate;
import java.util.*;


@Service
public class UserService implements IUserService {
    private final UserRepository userRepo;
    private PasswordEncoder passwordEncoder;

    private  JwtTokenUtil jwttkn;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }


    public User findByEmail(String email) {
        if(this.userRepo.findByEmail(email) != null){

            return this.userRepo.findByEmail(email);
        }else{
            User user = new User();
            user.setId(String.valueOf(0L));
            return user ;
        }
    }

    @Override
    public User updateUser(User user) {
        User u = userRepo.findUserByUsername(user.getUsername());
        if (u != null) {
            u.setNom(user.getNom());
            u.setPrenom(user.getPrenom());
            u.setEmail(user.getEmail());
            return userRepo.save(u);
        } else {
            return null;
        }
    }




    @Override
    public void saveVerificationToken(String id, String verfi) {
        User u = userRepo.findUserById( id);
        u.setVerificationToken(verfi);
        userRepo.save(u);
    }

    @Override
    public User findByVerificationToken(String verificationToken) {
        return userRepo.findByVerificationToken(verificationToken);
    }





    @Override
    public User enableOrDisable(String email) {
        User u = userRepo.findByEmail(email);
        if (u != null) {
            boolean isEnabled = u.getEnabled();
            u.setEnabled(!isEnabled);
            userRepo.save(u);
            return u;
        } else {
            throw new NotFoundException("User not found with email: " + email);
        }
    }

    @Override
    public void changePassword(String email, String oldPassword, String newPassword) {
        if(userRepo.existsByEmail(email)) {
            User user = userRepo.findByEmail(email);
            if (passwordEncoder.matches(oldPassword, user.getPassword())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepo.save(user);
            } else {
                throw new BadCredentialsException("Incorrect old password");
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * ?") // Run every day at midnight
    @Override
    public void disableInactiveAccounts() {
        List<User> inactiveUsers = userRepo.findByLastLoginBefore(LocalDate.now().minusDays(90));
        for (User user : inactiveUsers) {
            user.setEnabled(false);
            userRepo.save(user);
        }
    }

    @Override
    public User findbyUsername(String username) {
        return userRepo.findUserByUsername(username);
    }

    @Override
    public List<User> retrieveAllUser() {
        return userRepo.findAll();
    }


    @Override
    public void deleteUser(String username){
        User u = userRepo.findUserByUsername(username);
        userRepo.delete(u);
    }


    @Override
    public Roles getRoleByUsername(String username) {
        User user = userRepo.findUserByUsername(username);
        if (user != null) {
            return user.getRole();
        } else {
            throw new RuntimeException("User not found with username: " + username);
        }
    }

}

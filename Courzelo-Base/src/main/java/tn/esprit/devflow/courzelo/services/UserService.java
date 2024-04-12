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

import java.time.LocalDate;
import java.util.*;


@Service
public class UserService implements IUserService {
    private final UserRepository userRepo;
    private PasswordEncoder passwordEncoder;

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

    @JsonIgnore
    @Override
    public User updateUser(User user) {
        System.out.println("test");
        if (userRepo.existsById(user.getId())) {
            System.out.println("test");
            User existing = userRepo.findUserById(user.getId());
            user.setPassword(existing.getPassword());
            user.setEmail(existing.getEmail());
            user.setRole(existing.getRole());
            user.setUpdatedAt(new Date());

            System.out.println(user.toString());
            System.out.println("USER is = "+user);
            return userRepo.save(user);
        } else {
            System.out.println("exeption");
            throw new RuntimeException("User not found with id: " + user.getId());
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
    public Roles getRoleByUsername(String username) {
        User user = userRepo.findUserByUsername(username);
        if (user != null) {
            return user.getRole();
        } else {
            throw new RuntimeException("User not found with username: " + username);
        }
    }

}

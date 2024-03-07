package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.User;

import java.util.List;

public interface IUserService {
    User createUser(User user);
    User getUserByEmail(String email);
    List<User> getAllUsers();
    User updateUser(String email, User user);
    void deleteUser(String email);
    User FindByUsername(String username);
}

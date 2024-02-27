package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.UserDTO;

import java.util.List;

public interface IUserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserByEmail(String email);
    List<UserDTO> getAllUsers();
    void updateUser(String email, UserDTO userDTO);
    void deleteUser(String email);
}

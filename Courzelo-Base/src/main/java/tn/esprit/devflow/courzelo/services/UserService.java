package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.entity.UserDTO;
import tn.esprit.devflow.courzelo.entity.UserMapper;
import tn.esprit.devflow.courzelo.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        userRepository.save(user);
        return userMapper.toDTO(user);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return userMapper.toDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public void updateUser(String email, UserDTO userDTO) {
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            User updatedUser = userMapper.toEntity(userDTO);
            updatedUser.setIduser(existingUser.getIduser());
            userRepository.save(updatedUser);
        }
    }

    @Override
    public void deleteUser(String email) {
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            userRepository.delete(existingUser);
        }
    }


}

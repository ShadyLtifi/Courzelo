package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.TypeRole;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.entity.UserDTO;
import tn.esprit.devflow.courzelo.entity.UserMapper;
import tn.esprit.devflow.courzelo.repository.UserRepository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé avec le nom d'utilisateur: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                getAuthorities(user.getRole()));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(TypeRole role) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));

    }


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
    @Override
    public UserDTO FindByUsername(String username){
        User user = userRepository.findByUsername(username);
        return userMapper.toDTO(user);
    }


}

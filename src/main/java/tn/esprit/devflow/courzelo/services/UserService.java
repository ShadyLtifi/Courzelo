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
import tn.esprit.devflow.courzelo.repository.UserRepository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;



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
    public User createUser(User user) {
        return userRepository.save(user);

    }

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    @Override
    public User updateUser(String email, User user) {
        User existingUser = userRepository.findByEmail(email);
        return  userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(String email) {
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            userRepository.delete(existingUser);
        }
    }
    @Override
    public User FindByUsername(String username){
        return userRepository.findByUsername(username);
    }


}

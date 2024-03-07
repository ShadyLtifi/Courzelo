package tn.esprit.devflow.courzelo.Config;

import lombok.RequiredArgsConstructor;


import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import tn.esprit.devflow.courzelo.entity.TypeRole;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.services.UserService;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
@EnableWebSecurity
@RequiredArgsConstructor
public class CustumUserDetailService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.FindByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé avec le nom d'utilisateur: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                getAuthorities(user.getRole()));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(TypeRole role) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        if (role != null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));
        }

        return authorities;
    }

}

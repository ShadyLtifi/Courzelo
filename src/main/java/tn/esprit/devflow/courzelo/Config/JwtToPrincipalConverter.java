package tn.esprit.devflow.courzelo.Config;

import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.services.UserService;

import java.util.List;

@Component
public class JwtToPrincipalConverter {
    private UserService userService;

    public JwtToPrincipalConverter(UserService userService) {
        this.userService = userService;
    }

    public UserPrincipal convert(DecodedJWT jwt) {
        User user = userService.getUserByEmail(jwt.getClaim("email").asString());
        return new UserPrincipal(user);
    }

    private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt) {
        var claim = jwt.getClaim("role");
        if (claim.isNull() || claim.isMissing()) return List.of();
        return claim.asList(SimpleGrantedAuthority.class);
    }
}

package tn.esprit.devflow.courzelo.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class UserPrincipalAuthenticationToken extends AbstractAuthenticationToken {

    private final UserPrincipal principal;

     public UserPrincipalAuthenticationToken(UserPrincipal principal) {
        super(principal.getAuthorities());
        this.principal = principal;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public UserPrincipal getPrincipal() {
        return principal;
    }
}

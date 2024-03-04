package tn.esprit.devflow.courzelo.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import tn.esprit.devflow.courzelo.entity.SecurityConstants;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.entity.UserCredentials;
import tn.esprit.devflow.courzelo.entity.UserDTO;
import tn.esprit.devflow.courzelo.services.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl("/api/login"); // L'URL à surveiller pour les tentatives de connexion
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            UserCredentials creds = new ObjectMapper()
                    .readValue(req.getInputStream(), UserCredentials.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    public static class JwtAuthorizationFilter extends BasicAuthenticationFilter {

        private UserService userService;

        public JwtAuthorizationFilter(AuthenticationManager authManager, UserService userService) {
            super(authManager);
            this.userService = userService;
        }

        @Override
        protected void doFilterInternal(HttpServletRequest req,
                                        HttpServletResponse res,
                                        FilterChain chain) throws IOException, ServletException {
            String header = req.getHeader("Authorization");

            if (header == null || !header.startsWith("Bearer ")) {
                chain.doFilter(req, res);
                return;
            }

            UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(req, res);
        }

        private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
            String token = request.getHeader("Authorization");
            if (token != null) {
                String username = Jwts.parser()
                        .setSigningKey(SecurityConstants.SECRET.getBytes())
                        .parseClaimsJws(token.replace("Bearer ", ""))
                        .getBody()
                        .getSubject();

                if (username != null) {
                    UserDTO userDTO = userService.FindByUsername(username);
                    if (userDTO != null) {
                        return new UsernamePasswordAuthenticationToken(userDTO.getRole(), userDTO, null);
                    }
                    return null;
                }
                return null;
            }
            return null;
        }
    }}
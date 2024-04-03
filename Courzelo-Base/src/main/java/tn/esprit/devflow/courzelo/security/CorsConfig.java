package tn.esprit.devflow.courzelo.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/auth/**")
                .allowedOrigins("http://localhost:6085")
                .allowedMethods("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
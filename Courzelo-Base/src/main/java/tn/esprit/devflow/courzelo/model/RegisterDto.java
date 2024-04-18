package tn.esprit.devflow.courzelo.model;

import lombok.Data;
import lombok.ToString;
import tn.esprit.devflow.courzelo.entity.Roles;

import java.time.LocalDate;


@ToString
@Data
public class RegisterDto {
    private String email;
    private String username;
    private String nom;
    private String prenom;
    private long cin;
    private String password;
    private LocalDate dateN ;
    private Roles role;
}


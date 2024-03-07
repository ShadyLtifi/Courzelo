package tn.esprit.devflow.courzelo.USER;

import lombok.Data;
import lombok.ToString;
import tn.esprit.devflow.courzelo.entity.TypeRole;

import java.time.LocalDate;
import java.util.Date;


@ToString
@Data
public class Registre {
    private String email;
    private String username;
    private String nom;
    private String prenom;
    private String cin;
    private String password;
    private Date dateN ;
    private TypeRole role;
}
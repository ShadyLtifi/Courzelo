package tn.esprit.devflow.courzelo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Builder
@ToString
@Getter
@Setter
@Document
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String nom;
    private String prenom;
    private long cin;
    private LocalDate dateN;
    private String username;
    private String email;
    private Roles role;
    @JsonIgnore
    private String password;
    private Date updatedAt;
    private Date createdAt;
    private boolean enabled = false ;
    private LocalDate lastLogin ;
    private String verificationToken;


    public boolean getEnabled(){
        return this.enabled;
    }
}

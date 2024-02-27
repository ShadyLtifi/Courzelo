package tn.esprit.devflow.courzelo.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class User {
    @Id
    String iduser;

    @Indexed(unique = true)
    @NotNull
    @Size(max = 255)
    private String nom;

    @Indexed(unique = true)
    @NotNull
    @Size(max = 255)
    private String prenom;

    @NotNull
    @Size(max = 8)
    private int CIN;

    @NotNull
    private Date dateN;

    @NotNull
    @Email
    private String email;

    @NotNull
    @Size(min = 6)
    private String username;

    @NotNull
    @Size(min = 8)
    private String password;

    @Field("role")
    TypeRole role;

    @DBRef
    List<EventRegistration> eventregs;

    @DocumentReference(lazy = true, lookup = "{ 'user' : ?#{#self._id} }")
    @ReadOnlyProperty
    private Set<Claim> rec;


}

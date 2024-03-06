package tn.esprit.devflow.courzelo.entity;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Duration;
import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class User {
    @Id
    String iduser;
    @Size(max = 55)
    String firstName;
    String lastName;
    @Indexed(unique=true)
    String email;
    String password;
    @Field("role")
    TypeRole role;
    @DBRef
    List<EventRegistration> eventregs;


}

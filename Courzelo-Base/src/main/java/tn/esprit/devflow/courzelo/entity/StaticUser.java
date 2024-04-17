package tn.esprit.devflow.courzelo.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data

@FieldDefaults(level= AccessLevel.PRIVATE)

public class StaticUser {

    String id ;
     String name  ;
     String email ;
    String password ;

    public StaticUser() {
    }
    public StaticUser(String id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

}





package tn.esprit.devflow.courzelo.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class EventRegistration {
    @Id
    String idreg;
    @Size(max = 55)
    LocalDate registrationdate;
    Boolean confirmationstatus;
   @DBRef
   List<User> users;
}

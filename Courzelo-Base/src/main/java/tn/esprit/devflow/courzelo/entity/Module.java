package tn.esprit.devflow.courzelo.entity;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Module {
    @Id
    String idmodule;
   int progress;
   @DBRef
   List<Course> courses;
   @DBRef
    Program program;
}

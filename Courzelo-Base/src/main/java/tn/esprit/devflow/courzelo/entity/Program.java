package tn.esprit.devflow.courzelo.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Program {
    @Id
    String idprog;
  @Field("speciality")
   Speciality speciality;
  @DBRef
  List<Module> modules;

}

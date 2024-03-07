package tn.esprit.devflow.courzelo.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.Date;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Certification {
    @Id
    String idCertif;
    String title;
    LocalDate issueDate;
    LocalDate expirationDate;
    String description;







}

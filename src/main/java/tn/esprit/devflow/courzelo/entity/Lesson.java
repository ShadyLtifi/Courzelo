package tn.esprit.devflow.courzelo.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Lesson {
    @Id
    String idlesson;
    String title;
    String content;
  @DBRef
    Course course;
}

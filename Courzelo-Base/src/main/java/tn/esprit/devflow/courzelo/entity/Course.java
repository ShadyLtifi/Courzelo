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

public class Course {
    @Id
    String idCourse;
    @Size(max = 55)
     String title;
    String content;
    LocalDate datecomment;
    @DBRef
    List<Lesson> lessons;
    @DBRef
    List<Quiz> quizzes;

}

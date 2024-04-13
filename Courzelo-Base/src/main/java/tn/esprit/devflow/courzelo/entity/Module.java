package tn.esprit.devflow.courzelo.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Module {
    @Id
    String idmodule;
   String progress;
   String titleModule;
   String nbreHeure;
   String description;
    public void addLesson(Lesson lesson) {
        // Assurez-vous que la classe est initialisée
        if (classes == null) {
            classes = new Class();
        }
        // Ajoutez la leçon à la liste des leçons de la classe associée au module
        classes.addLesson(lesson);
    }

    //   @JsonIgnore
@DBRef
Class classes;
}

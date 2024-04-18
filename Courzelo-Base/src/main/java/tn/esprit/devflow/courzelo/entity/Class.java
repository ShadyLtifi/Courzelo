package tn.esprit.devflow.courzelo.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Class {
    @Id
     String idClass;
     int capacity;
    @Field("level")
     Level level;
    Integer progress;
    @Field("speciality")
    Speciality speciality;
    public void addLesson(Lesson lesson) {
        if (lessons == null) {
            lessons = new ArrayList<>();
        }
        lessons.add(lesson);
    }

    @DBRef
     User user;
//    @JsonIgnore
    @DBRef
     List<Module> modules;
    @DBRef
    List<Lesson> lessons;
}

package tn.esprit.devflow.courzelo.entity;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Event {

    @Id
    String idevent;
    @Size(max = 55)
    String title;
    String photo;
    int maxcapacity;
    String duration;
   LocalDate debutdate;
   Boolean price;
    @Field("category")
    Category category;
    @DBRef
    List<EventRegistration> eventRegs;
    @DBRef
    Speaker speaker;



}

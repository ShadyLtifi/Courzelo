package tn.esprit.devflow.courzelo.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.Size;
import java.time.Duration;
import java.time.LocalDate;
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
    Duration duration;
   LocalDate debutdate;
   Boolean price;
    @Field("category")
    Category category;
    @DBRef
    List<EventRegistration> eventRegs;
    @DBRef
    Speaker speaker;

}

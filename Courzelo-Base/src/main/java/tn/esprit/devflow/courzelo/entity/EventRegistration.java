package tn.esprit.devflow.courzelo.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class EventRegistration {

    @Id
    private String idreg;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate registrationDate;

    private Boolean confirmationStatus;

    @DBRef
    private List<Event> events; // A list of events the user is registered to

    @DBRef
    private User user; // The user registered to these events

    private String userEmail; // Email of the registered user
    private String userId; // ID of the registered user
    public void confirmRegistration() {
        this.confirmationStatus = true;
    }




}

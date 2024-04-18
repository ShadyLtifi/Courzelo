package tn.esprit.devflow.courzelo.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL) // Inclut seulement les champs non-null dans le JSON

public class EventWithSpeakerDTO {
    private String idevent;
    private String title;
    private String photo;
    private int maxcapacity;
    private String duration;
    private LocalDate debutdate;
    private Boolean price;
    private Category category;
    // Champs du Speaker à inclure
    private String speakerId;
    private String name;
    private String speakerTitle; // Exemple de champ supplémentaire du Speaker
    public EventWithSpeakerDTO() {}

    // Constructeur, Getters et Setters
    @JsonCreator
    public EventWithSpeakerDTO(@JsonProperty("idevent") String idevent,
                               @JsonProperty("title") String title,
                               @JsonProperty("photo") String photo,
                               @JsonProperty("maxcapacity") int maxcapacity,
                               @JsonProperty("duration") String duration,
                               @JsonProperty("debutdate") LocalDate debutdate,
                               @JsonProperty("price") Boolean price,
                               @JsonProperty("category") Category category,
                               @JsonProperty("speakerId") String speakerId,
                               @JsonProperty("name") String name,
                               @JsonProperty("speakerTitle") String speakerTitle) {
        this.idevent = idevent;
        this.title = title;
        this.photo = photo;
        this.maxcapacity = maxcapacity;
        this.duration = duration;
        this.debutdate = debutdate;
        this.price = price;
        this.category = category;
        this.speakerId = speakerId;
        this.name = name;
        this.speakerTitle = speakerTitle;
    }

}

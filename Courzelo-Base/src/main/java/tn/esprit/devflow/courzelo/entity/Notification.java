package tn.esprit.devflow.courzelo.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document

public class Notification {
    private String recipient;
    private String content;

}

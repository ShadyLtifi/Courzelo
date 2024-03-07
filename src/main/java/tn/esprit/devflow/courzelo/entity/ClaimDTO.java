package tn.esprit.devflow.courzelo.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document
public class ClaimDTO {
    private String titre;
    private LocalDate dateclaim;
    private TypeClaim typeclaim;;
    private Status status;
}

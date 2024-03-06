package tn.esprit.devflow.courzelo.DTO;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import tn.esprit.devflow.courzelo.entity.Status;
import tn.esprit.devflow.courzelo.entity.TypeClaim;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "claims")
public class ClaimDTO {
    @Id
    private String idclaim;
    private String title;
    private LocalDate dateclaim;
    private TypeClaim typeclaim;
    private Status status;
}

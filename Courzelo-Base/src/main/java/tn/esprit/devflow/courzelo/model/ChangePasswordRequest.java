package tn.esprit.devflow.courzelo.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangePasswordRequest {
    private String oldPass;
    private String newPass;
    private String email;
}

package tn.esprit.devflow.courzelo.USER;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponce {
    private final String accessToken;
}

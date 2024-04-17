package tn.esprit.devflow.courzelo.entity;

import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;


@Component
public class ClaimMapper {
    public ClaimDTO toDTO(@NotNull Claim c) {
        ClaimDTO claimDTO = new ClaimDTO();
        claimDTO.setTitre(c.getTitre());
        claimDTO.setDateclaim(c.getDateclaim());
        claimDTO.setTypeclaim(c.getTypeclaim());
        claimDTO.setStatus(c.getStatus());
        return claimDTO;
    }

    public Claim toEntity(@NotNull ClaimDTO claimDTO) {
        Claim claim = new Claim();
        claim.setTitre(claimDTO.getTitre());
        claim.setDateclaim(claimDTO.getDateclaim());
        claim.setTypeclaim(claimDTO.getTypeclaim());
        claim.setStatus(claimDTO.getStatus());
        return claim;
    }
}

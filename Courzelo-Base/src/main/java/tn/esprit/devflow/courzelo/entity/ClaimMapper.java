package tn.esprit.devflow.courzelo.entity;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import org.springframework.stereotype.Component;
import tn.esprit.devflow.courzelo.DTO.ClaimDTO;

@Component
public class ClaimMapper {
    public ClaimDTO toDTO(@NotNull Claim c) {
        ClaimDTO claimDTO = new ClaimDTO();
        claimDTO.setTitle(c.getTitle());
        claimDTO.setDateclaim(c.getDateclaim());
        claimDTO.setTypeclaim(c.getTypeclaim());
        claimDTO.setStatus(c.getStatus());
        return claimDTO;
    }

    public Claim toEntity(@NotNull ClaimDTO claimDTO) {
        Claim claim = new Claim();
        claim.setTitle(claimDTO.getTitle());
        claim.setDateclaim(claimDTO.getDateclaim());
        claim.setTypeclaim(claimDTO.getTypeclaim());
        claim.setStatus(claimDTO.getStatus());
        return claim;
    }
}

package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Claim;
import tn.esprit.devflow.courzelo.entity.ClaimDTO;
import tn.esprit.devflow.courzelo.entity.Class;

import java.util.List;

public interface IClaimService {


    ClaimDTO createClaim(ClaimDTO claimDTO);

    ClaimDTO getClaimById(String idclaim);

    List<ClaimDTO> getAllClaim();

    void updateClaim(String idClaim, ClaimDTO claimDTO);

    void deleteUser(String idclaim);
}

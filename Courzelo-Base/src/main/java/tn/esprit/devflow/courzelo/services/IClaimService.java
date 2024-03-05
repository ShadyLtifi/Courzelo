package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Claim;
import tn.esprit.devflow.courzelo.entity.ClaimDTO;
import tn.esprit.devflow.courzelo.entity.Status;
import tn.esprit.devflow.courzelo.entity.TypeClaim;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface IClaimService {


    ClaimDTO createClaim(ClaimDTO claimDTO);
    ClaimDTO getClaimById(String idclaim);
    List<ClaimDTO> getAllClaim();
    ClaimDTO updateClaim(String idClaim, ClaimDTO claimDTO);
    void deleteClaim(String idclaim);
    void assignClaim(String idClaim, String userId);
    List<Claim> filterClaimsByStatus(Status status);
    List<Claim> searchClaimsByTitle(String Title);
    List<Claim> getClaimsbyTypeandStatus(Status s, TypeClaim tp);
    Map<Status, Double> calculateClaimPercentagesForDay(LocalDate date);
}

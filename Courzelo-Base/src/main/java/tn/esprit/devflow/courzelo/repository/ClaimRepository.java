package tn.esprit.devflow.courzelo.repository;

import org.apache.logging.log4j.util.Timer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Claim;
import tn.esprit.devflow.courzelo.entity.ClaimDTO;
import tn.esprit.devflow.courzelo.entity.Status;
import tn.esprit.devflow.courzelo.entity.TypeClaim;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface ClaimRepository extends MongoRepository<Claim,String> {
   Claim findClaimByIdclaim(String idclaim);
   List<Claim>  findClaimByTitre(String string);
   List<Claim> findClaimByStatus(Status status);
   List<Claim>  findClaimByTypeclaimAndAndStatus(TypeClaim tp, Status status);
   List<Claim> findClaimsByDateclaimBetween(LocalDate startOfDay, LocalDate endOfDay);
}

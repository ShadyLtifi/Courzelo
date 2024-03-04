package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Claim;
import tn.esprit.devflow.courzelo.entity.ClaimDTO;

@Repository
public interface ClaimRepository extends MongoRepository<Claim,String> {
   Claim findClaimByIdclaim(String idclaim);
}

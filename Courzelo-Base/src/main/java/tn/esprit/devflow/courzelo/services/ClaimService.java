package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.*;
import tn.esprit.devflow.courzelo.repository.ClaimRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClaimService implements IClaimService{



    @Autowired
    private ClaimRepository claimRepository;
    @Autowired
    private ClaimMapper claimMapper;

    @Override
    public ClaimDTO createClaim(ClaimDTO claimDTO) {
        Claim claim = claimMapper.toEntity(claimDTO);
        claimRepository.save(claim);
        return claimMapper.toDTO(claim);
    }

    @Override
    public ClaimDTO getClaimById(String idclaim) {
        Claim claim = claimRepository.findClaimByIdclaim(idclaim);
        return claimMapper.toDTO(claim);
    }

    @Override
    public List<ClaimDTO> getAllClaim() {
        List<Claim> claims = claimRepository.findAll();
        return claims.stream().map(claimMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public void updateClaim(String idClaim, ClaimDTO claimDTO) {
        Claim existingClaim = claimRepository.findClaimByIdclaim(idClaim);
        if (existingClaim != null) {
            Claim updatedClaim = claimMapper.toEntity(claimDTO);
            updatedClaim.setIdclaim(existingClaim.getIdclaim());
            claimRepository.save(updatedClaim);
        }
    }

    @Override
    public void deleteUser(String idclaim) {
        Claim existingClaim = claimRepository.findClaimByIdclaim(idclaim);
        if (existingClaim != null) {
            claimRepository.delete(existingClaim);
        }
    }
}

package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.*;
import tn.esprit.devflow.courzelo.repository.ClaimRepository;
import tn.esprit.devflow.courzelo.repository.UserRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ClaimService implements IClaimService{



    @Autowired
    private ClaimRepository claimRepository;
    @Autowired
    private ClaimMapper claimMapper;
    @Autowired
    private UserRepository userRepository;

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
    public ClaimDTO updateClaim(String idClaim, ClaimDTO claimDTO) {
        Claim existingClaim = claimRepository.findClaimByIdclaim(idClaim);
        if (existingClaim != null) {
            Claim updatedClaim = claimMapper.toEntity(claimDTO);
            updatedClaim.setIdclaim(existingClaim.getIdclaim());
            claimRepository.save(updatedClaim);
        }
        return claimDTO;
    }

    @Override
    public void deleteClaim(String idclaim) {
        Claim existingClaim = claimRepository.findClaimByIdclaim(idclaim);
        if (existingClaim != null) {
            claimRepository.delete(existingClaim);
        }
    }

    @Override
    public void assignClaim(String idClaim, String userId) {
        User user = userRepository.findUserById(userId);
        Claim claim = claimRepository.findClaimByIdclaim(idClaim);
        if (user != null && claim != null) {
            claim.setUser(user);
            claimRepository.save(claim);
        }
    }


    @Override
    public List<Claim> filterClaimsByStatus(Status status) {
        List<Claim> claim = claimRepository.findClaimByStatus(status);
        return claim;
    }

    @Override
    public List<Claim> searchClaimsByTitle(String Title) {
        List<Claim> claim = claimRepository.findClaimByTitre(Title);
        return claim;
    }


    @Override
    public List<Claim> getClaimsbyTypeandStatus(Status s, TypeClaim tp) {
        List<Claim> c = claimRepository.findClaimByTypeclaimAndAndStatus(tp , s);
        return c;
    }

    @Override
    public Map<Status, Double> calculateClaimPercentagesForDay(LocalDate date) {
        LocalDate startOfDay = date.atStartOfDay().toLocalDate();
        LocalDate endOfDay = startOfDay.plusDays(1).atTime(23, 59, 59).toLocalDate();
        List<Claim> claimsForDay = claimRepository.findClaimsByDateclaimBetween(startOfDay, endOfDay);

        int totalClaims = claimsForDay.size();
        Map<Status, Long> claimStatusCounts = new HashMap<>();
        for (Status status : Status.values()) {
            long count = claimsForDay.stream()
                    .filter(claim -> claim.getStatus() == status)
                    .count();
            claimStatusCounts.put(status, count);
        }

        Map<Status, Double> claimStatusPercentages = new HashMap<>();
        for (Map.Entry<Status, Long> entry : claimStatusCounts.entrySet()) {
            double percentage = (entry.getValue() * 100.0) / totalClaims;
            claimStatusPercentages.put(entry.getKey(), percentage);
        }

        return claimStatusPercentages;
    }
}


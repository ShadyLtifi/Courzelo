package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.ClaimDTO;
import tn.esprit.devflow.courzelo.services.IClaimService;

import java.util.List;

@RestController
@CrossOrigin
public class ClaimController {
    @Autowired
    private IClaimService claimService;

    @PostMapping("/addClaim")
    public ClaimDTO addClaim(@RequestBody ClaimDTO c) {
        return claimService.createClaim(c);
    }

    @GetMapping("/retrieveallClaim")
    @ResponseBody
    public List<ClaimDTO> getClaim() {
        List<ClaimDTO> listClaim = claimService.getAllClaim();
        return listClaim ;
    }

    @PutMapping("/updateClaim")
    @ResponseBody
    public ClaimDTO modifyClaim(@RequestBody ClaimDTO c, @PathVariable String idClaim) {
        return claimService.updateClaim(idClaim,c);
    }
    @DeleteMapping("/DeleteClaim/{idClaim}")
    @ResponseBody
    public void deleteClaim(@PathVariable String idClaim) {
        claimService.deleteClaim(idClaim);
    }

    @GetMapping("/retrieveidClaim/{idClaim}")
    @ResponseBody
    public ClaimDTO retrieveClaim (@PathVariable ("idClaim")String idClaim) {
        return claimService.getClaimById(idClaim);
    }

    @GetMapping("/affecteClaimUser/{idClaim}/{idUser}")
    @ResponseBody
    public void assignClaim(String idClaim, String userId){
        claimService.assignClaim(idClaim,userId);
    }
}

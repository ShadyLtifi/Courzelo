package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Module;
import tn.esprit.devflow.courzelo.entity.Publication;
import tn.esprit.devflow.courzelo.services.IPubService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PubController {
    @Autowired
    IPubService pubService;

    @PostMapping("/addPublication")
    public Publication addPublication(@RequestBody Publication pub) {
        return pubService.addPublication(pub);
    }

    @GetMapping("/retrieveallPublication")
    @ResponseBody
    public List<Publication> getPublication() {

        List<Publication> listPublication = pubService.retrieveAllPublication();

        return listPublication ;

    }
    @PutMapping("/updatePublication")

    @ResponseBody
    public Publication modifyPublication(@RequestBody Publication publication) {

        return pubService.updatePublication(publication);

    }
    @DeleteMapping("/DeletePublication/{idPublication}")

    @ResponseBody

    public void deletePublication(@PathVariable String idPublication) {

        pubService.deletePublication(idPublication);

    }

    @GetMapping("/retrievePublication/{Publication-id}")
    @ResponseBody

    public Publication retrievePublication (@PathVariable ("Publication-id")String idPublication) {
        return pubService.retrievePublication(idPublication);
    }

}

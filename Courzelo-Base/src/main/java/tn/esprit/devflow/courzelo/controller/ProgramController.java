package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Module;
import tn.esprit.devflow.courzelo.entity.Program;
import tn.esprit.devflow.courzelo.services.IProgramService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProgramController {
    @Autowired
    IProgramService progService;

    @PostMapping("/addProgram")
    public Program addProgram(@RequestBody Program prog) {
        return progService.addProgram(prog);
    }

    @GetMapping("/retrieveallProgram")
    @ResponseBody
    public List<Program> getProgram() {

        List<Program> listProgram = progService.retrieveAllProgram();

        return listProgram ;

    }
    @PutMapping("/updateProgram")

    @ResponseBody
    public Program modifyProgram(@RequestBody Program program) {

        return progService.updateProgram(program);

    }
    @DeleteMapping("/DeleteProgram/{idProgram}")

    @ResponseBody

    public void deleteProgram(@PathVariable String idProgram) {

        progService.deleteProgram(idProgram);

    }

    @GetMapping("/retrieveProgram/{Program-id}")
    @ResponseBody

    public Program retrieveProgram (@PathVariable ("Program-id")String idProgram) {
        return progService.retrieveProgram(idProgram);
    }

}
package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.entity.Level;
import tn.esprit.devflow.courzelo.entity.Module;
import tn.esprit.devflow.courzelo.entity.Speciality;
import tn.esprit.devflow.courzelo.services.IModuleService;
import tn.esprit.devflow.courzelo.services.ModuleService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ModuleController {
    @Autowired
    IModuleService moduleService;
    @Autowired
    ModuleService moduleServ;

    @PostMapping("/addModule")
    public Module addModule(@RequestBody Module l) {
        return moduleService.addModule(l);
    }

    @GetMapping("/retrieveallModule")
    @ResponseBody
    public List<Module> getModule() {

        List<Module> listModule = moduleService.retrieveAllModule();

        return listModule ;

    }
    @PutMapping("/updateModule/{idModule}")

    @ResponseBody
    public Module modifyModule(@RequestBody Module module) {

        return moduleService.updateModule(module);

    }
    @DeleteMapping("/DeleteModule/{idModule}")

    @ResponseBody

    public void deleteModule(@PathVariable String idModule) {

        moduleService.deleteModule(idModule);

    }

    @GetMapping("/retrieveModule/{Moduleid}")
    @ResponseBody

    public Module retrieveModule (@PathVariable ("Moduleid")String idModule) {
        return moduleService.retrieveModule(idModule);
    }
    @PostMapping("/addBySpeciality")
    public ResponseEntity<Module> addModuleBySpeciality(@RequestParam("speciality") Speciality speciality, @RequestBody Module newModule) {
        try {
            Module addedModule = moduleServ.addModuleBySpeciality(speciality, newModule);
            if (addedModule != null) {
                return ResponseEntity.ok(addedModule);
            } else {
                return ResponseEntity.badRequest().build(); // Ou lancez une exception appropriée
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Spécialité invalide
        }
    }
    @PostMapping("/addBySpecialityAndLevel")
    public ResponseEntity<Module> addModuleBySpecialityAndLevel(@RequestParam("speciality") Speciality speciality, @RequestParam("level") Level level, @RequestBody Module newModule) {
        try {
            Module addedModule = moduleServ.addModuleBySpecialityAndLevel(speciality, level, newModule);
            if (addedModule != null) {
                return ResponseEntity.ok(addedModule);
            } else {
                return ResponseEntity.badRequest().build(); // Ou lancez une exception appropriée
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Spécialité ou niveau invalide
        }


    }

//
//    @GetMapping("/getModulesBySpeciality/{speciality}")
//
//    public List<Module> getModulesBySpeciality(@PathVariable("speciality") Speciality speciality) {
//        return moduleServ.getModulesBySpeciality(speciality);
//    }

    @GetMapping("/modules/{speciality}")
    public ResponseEntity<List<Module>> getModulesBySpeciality(@PathVariable Speciality speciality) {
        List<Module> modules = moduleServ.getModulesBySpeciality(speciality);
        return ResponseEntity.ok(modules);
    }

    @GetMapping("/Moduless/{speciality}/{level}")
    public List<Module> getModuleBySpecialityAndLevel(@PathVariable("speciality") Speciality speciality, @PathVariable("level") Level level) {
        return moduleServ.getModuleBySpecialityAndLevel(speciality,level);
    }
    @GetMapping("/moduleytr/{moduleId}")
    public ResponseEntity<Module> getModuleWithLesson(@PathVariable String moduleId) {
        Module module = moduleServ.getModuleWithLesson(moduleId);
        if (module != null) {
            return ResponseEntity.ok(module);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/addLessonToModule/{idmodule}/{lessonId}")
    public Module addLessonToModule(@PathVariable("idmodule") String idmodule, @PathVariable("lessonId") String idlesson) {
      return   moduleServ.addLessonToModule(idmodule, idlesson);

    }

}

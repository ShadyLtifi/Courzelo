package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.*;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.services.ClassService;
import tn.esprit.devflow.courzelo.services.IClassService;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class ClassController {
    @Autowired
    IClassService classService;
    @Autowired
    ClassService classServ;
    @PostMapping("/addClass")
    public Class addClass(@RequestBody Class c) {
        return classService.addClass(c);
    }

    @GetMapping("/retrieveallclass")
    @ResponseBody
    public List<Class> getClasse() {

        List<Class> listClass = classService.retrieveAllClass();

        return listClass ;

    }

    @PutMapping("/updateclass/{idClass}")

    @ResponseBody
    public Class modifyClasse(@RequestBody Class c) {

        return classService.updateClass(c);

    }

    @DeleteMapping("/DeleteClasse/{idClass}")

    @ResponseBody

    public void deleteClass(@PathVariable String idClass) {

        classService.deleteClass(idClass);

    }

    @GetMapping("/retrieveClass/{classid}")
    @ResponseBody

    public Class retrieveClass (@PathVariable ("classid")String idClass) {
        return classService.retrieveClass(idClass);
    }


    @PostMapping("/{classId}/addLesson")
    public ResponseEntity<String> addLessonToClass(@PathVariable String classId, @RequestBody Lesson lesson) {
        try {
            classServ.addLessonToClass(classId, lesson);
            return ResponseEntity.ok("Lesson added to class successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add lesson to class: " + e.getMessage());
        }
    }

    @PostMapping("/addLessonByLevelAndSpeciality")
    public ResponseEntity<String> addLessonToClassByLevelAndSpeciality(@RequestParam Level level, @RequestParam Speciality speciality, @RequestBody Lesson lesson) {
        try {
            classServ.addLessonToClassByLevelAndSpeciality(level, speciality, lesson);
            return ResponseEntity.ok("Lesson added to classes with level " + level + " and speciality " + speciality + " successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add lesson to classes: " + e.getMessage());
        }



    }
}

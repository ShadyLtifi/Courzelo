package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Course;
import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.services.ILessonService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LessonController {
    @Autowired
    ILessonService lessonService;

    @PostMapping("/addLesson")
    public Lesson addLesson(@RequestBody Lesson l) {
        return lessonService.addLesson(l);
    }

    @GetMapping("/retrieveallLesson")
    @ResponseBody
    public List<Lesson> getLesson() {

        List<Lesson> listLesson = lessonService.retrieveAllLesson();

        return listLesson ;

    }
    @PutMapping("/updateLesson")

    @ResponseBody
    public Lesson modifyLesson(@RequestBody Lesson l) {

        return lessonService.updateLesson(l);

    }
    @DeleteMapping("/DeleteLesson/{idlesson}")

    @ResponseBody

    public void deleteLesson(@PathVariable String idlesson) {

        lessonService.deleteLesson(idlesson);

    }

    @GetMapping("/retrieveLesson/{Lesson-id}")
    @ResponseBody

    public Lesson retrieveLesson (@PathVariable ("Lesson-id")String idlesson) {
        return lessonService.retrieveLesson(idlesson);
    }
}

package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Comment;
import tn.esprit.devflow.courzelo.entity.Course;
import tn.esprit.devflow.courzelo.services.ICourseService;

import java.util.List;

@RestController
public class CourseController {
    @Autowired
    ICourseService courseService;

    @PostMapping("/addCourse")
    public Course addCourse(@RequestBody Course c) {
        return courseService.addCourse(c);
    }

    @GetMapping("/retrieveallCourse")
    @ResponseBody
    public List<Course> getCourse() {

        List<Course> listComment = courseService.retrieveAllCourse();

        return listComment ;

    }
    @PutMapping("/updateCourse")

    @ResponseBody
    public Course modifyCourse(@RequestBody Course c) {

        return courseService.updateCourse(c);

    }
    @DeleteMapping("/DeleteCourse/{idCourse}")

    @ResponseBody

    public void deleteCourse(@PathVariable String idCourse) {

        courseService.deleteCourse(idCourse);

    }

    @GetMapping("/retrieveCourse/{course-id}")
    @ResponseBody

    public Course retrieveCourse (@PathVariable ("course-id")String idCourse) {
        return courseService.retrieveCourse(idCourse);
    }

}

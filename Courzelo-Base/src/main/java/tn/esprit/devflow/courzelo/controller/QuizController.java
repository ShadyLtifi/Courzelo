package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Quiz;
import tn.esprit.devflow.courzelo.repository.QuizRepository;
import tn.esprit.devflow.courzelo.services.IQuizService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class QuizController {
    @Autowired
    IQuizService quizserv;

    @PostMapping("/addQuiz")
    public Quiz addQuiz(@RequestBody Quiz q) {
        return quizserv.addQuiz(q);
    }

    @GetMapping("/retrieveallquizzes")
    @ResponseBody
    public List<Quiz> getQuizzes() {

        List<Quiz> listQuizzes= quizserv.retrieveAllQuizzes();

        return listQuizzes ;

    }

    @PutMapping("/updateQuiz/{idquiz}")
    @ResponseBody
    public Quiz modifyQuiz(@RequestBody Quiz q, @PathVariable String idquiz ) {

        return quizserv.updateQuiz(q,idquiz);


    }

    @DeleteMapping("/deleteQuiz/{idquiz}")
    @ResponseBody
    public void deleteQuiz(@PathVariable String idquiz) {
        quizserv.deleteQuiz(idquiz);




    }

    @GetMapping("/retrieveQuiz/{idquiz}")
    @ResponseBody

    public Quiz retrieveQuiz (@PathVariable String idquiz) {
        return quizserv.retrieveQuiz(idquiz);

    }

}

package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Quiz;
import tn.esprit.devflow.courzelo.repository.QuizRepository;

import java.util.List;

@Service
public class QuizService implements IQuizService{
    @Autowired
    QuizRepository quizrepo;
    @Override
    public Quiz addQuiz(Quiz q) {
        return quizrepo.save(q);
    }

    @Override
    public List<Quiz> retrieveAllQuizzes() {
        return quizrepo.findAll();
    }

    @Override
    public Quiz updateQuiz (Quiz q, String idquiz) {
       q.setIdquiz(idquiz);
       return quizrepo.save(q);
    }

    @Override
    public void deleteQuiz(String idquiz) {
quizrepo.deleteById(idquiz);
    }

    @Override
    public Quiz retrieveQuiz(String idquiz) {
        return quizrepo.findById(idquiz).get();
    }
}

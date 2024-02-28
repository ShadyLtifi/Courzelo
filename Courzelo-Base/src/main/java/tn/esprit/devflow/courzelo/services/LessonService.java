package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.repository.LessonRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LessonService implements  ILessonService{
    @Autowired
    LessonRepository lessonRepository;
    @Override
    public List<Lesson> retrieveAllLesson() {
        return lessonRepository.findAll();
    }

    @Override
    public Lesson addLesson(Lesson Lesson) {
        return lessonRepository.save(Lesson);
    }

    @Override
    public Lesson updateLesson(Lesson Lesson) {
        return lessonRepository.save(Lesson);
    }

    @Override
    public void deleteLesson(String idlesson) {
lessonRepository.deleteById(idlesson);
    }

    @Override
    public Lesson retrieveLesson(String idlesson) {
        Optional<Lesson> lessonOptional = lessonRepository.findById(idlesson);
        return lessonOptional.get();
    }
}

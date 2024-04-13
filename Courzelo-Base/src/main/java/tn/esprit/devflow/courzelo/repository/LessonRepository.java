package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.entity.Level;
import tn.esprit.devflow.courzelo.entity.Module;
import tn.esprit.devflow.courzelo.entity.Speciality;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends MongoRepository<Lesson,String> {
    Optional<Lesson> findByContent(String content);
    List<Lesson> findByClasse(Class classe);
    List<Lesson> findByClasseModules(Module module);
}

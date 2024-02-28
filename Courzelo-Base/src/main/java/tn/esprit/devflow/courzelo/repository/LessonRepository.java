package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Lesson;

@Repository
public interface LessonRepository extends MongoRepository<Lesson,String> {
}

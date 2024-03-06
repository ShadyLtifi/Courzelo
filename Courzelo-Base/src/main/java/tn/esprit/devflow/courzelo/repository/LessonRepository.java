package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Lesson;

import java.util.List;

@Repository
public interface LessonRepository extends MongoRepository<Lesson,String> {
    List<Lesson> findByContent(String content);
}

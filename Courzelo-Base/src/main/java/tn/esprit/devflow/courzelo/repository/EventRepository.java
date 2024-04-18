package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Event;

import java.util.List;

@Repository

public interface EventRepository extends MongoRepository<Event,String> {
        List<Event> findByTitleContainingIgnoreCase(String title);


}

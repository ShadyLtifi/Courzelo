package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.devflow.courzelo.entity.Event;

public interface EventRepository extends MongoRepository<Event,String> {
}

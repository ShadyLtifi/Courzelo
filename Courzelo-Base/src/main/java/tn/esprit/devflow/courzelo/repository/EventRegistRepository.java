package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.devflow.courzelo.entity.EventRegistration;

public interface EventRegistRepository extends MongoRepository<EventRegistration,String> {
}

package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Event;

import java.awt.print.Pageable;
import java.util.List;

@Repository

public interface EventRepository extends MongoRepository<Event,String> {
        List<Event> findByTitleContainingIgnoreCase(String title);
        List<Event> findAllByOrderByCreatedAtDesc();
        @Query(value = "{}", sort = "{'eventRegs.size': -1}")
        List<Event> findTopEvents(Pageable pageable);;
}


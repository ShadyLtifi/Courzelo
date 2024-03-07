package tn.esprit.devflow.courzelo.services;

import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.repository.EventRepository;

@Service
public class EventService implements IEventService {
@Autowired
    EventRepository eventrepo;
    @Override
    public Event addEvent(Event e) {
        return eventrepo.save(e);
    }
}

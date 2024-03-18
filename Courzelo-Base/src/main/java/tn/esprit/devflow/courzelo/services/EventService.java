package tn.esprit.devflow.courzelo.services;

import io.swagger.v3.oas.annotations.servers.Server;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Category;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.repository.EventRepository;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventService implements IEventService {
@Autowired
    EventRepository eventrepo;
    @Override
    public Event addEvent(  Event e){



        return eventrepo.save(e);

        }



    @Override
    public List<Event> retrieveAllEvents() {
        return eventrepo.findAll();
    }

    @Override
    public Event updateEvent(Event e) {


     return eventrepo.save(e);

    }

    @Override
    public void deleteEvent(String idevent) {
        eventrepo.deleteById(idevent);
    }

    @Override
    public Event retrieveEvent( String idevent) {
        Event e =eventrepo.findById(idevent).get();
        return  e;

    }
    public void uploadPhoto(String eventId, MultipartFile photoFile) throws IOException {
        Optional<Event> optionalEvent = eventrepo.findById(eventId);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            String photoBase64 = convertToBase64(photoFile);
            event.setPhoto(photoBase64);
            eventrepo.save(event);
        } else {
            try {
                throw new NotFoundException("Event not found");
            } catch (NotFoundException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private String convertToBase64(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }
}

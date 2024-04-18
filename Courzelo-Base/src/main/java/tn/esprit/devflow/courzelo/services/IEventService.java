package tn.esprit.devflow.courzelo.services;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Event;

import java.util.List;

public interface IEventService {
    public Event addEvent(Event e);

    public List<Event> retrieveAllEvents();

    public Event updateEvent(Event e);

    public void deleteEvent(String idevent);

    public Event retrieveEvent(String idevent);

    Event addEventWithSpeaker(Event event, String name);

    public List<Event> searchEventsByTitle(String title);
    String uploadEventPhoto(String eventId, MultipartFile file);

    public String getphotoByEventId(String idevent) ;


    }
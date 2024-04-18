package tn.esprit.devflow.courzelo.controller;

import groovy.util.logging.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.repository.EventRepository;
import tn.esprit.devflow.courzelo.services.EventRegistService;
import tn.esprit.devflow.courzelo.services.IEventService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EventController {

    @Autowired
    IEventService eventserv;
    @Autowired
    EventRepository eventrepo;
    @Autowired
    Environment env;
    @Autowired
    EventRegistService registserv;

    private static final Logger log = LoggerFactory.getLogger(EventController.class);


    @PostMapping("/addEvent")
    public Event addEvent(@RequestBody Event e) {


        return eventserv.addEvent(e);
    }


    @GetMapping("/retrieveallevents")
    @ResponseBody
    public List<Event> getEvents() {

        List<Event> listevents = eventserv.retrieveAllEvents();

        return listevents;

    }

    @PutMapping("/updateEvent/{idevent}")
    @ResponseBody
    public Event modifyEvent(@RequestBody Event e) {

        return eventserv.updateEvent(e);

    }

    @DeleteMapping("/deleteEvent/{idevent}")
    @ResponseBody
    public void deleteEvent(@PathVariable String idevent) {
        eventserv.deleteEvent(idevent);

    }

    @GetMapping("/retrieveEvent/{idevent}")
    @ResponseBody

    public Event retrieveEvent(@PathVariable String idevent) {
        return eventserv.retrieveEvent(idevent);

    }

    @PostMapping("/addEventWithSpeaker/{name}")
    public ResponseEntity<Event> addEventWithSpeaker(@RequestBody Event event, @PathVariable String name) {
        Event savedEvent = eventserv.addEventWithSpeaker(event, name);
        if (savedEvent != null) {
            return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(@RequestParam String title) {
        List<Event> foundEvents = eventserv.searchEventsByTitle(title);
        return ResponseEntity.ok(foundEvents);
    }


    @PostMapping("/uploadEventPhoto/{eventId}")
    public ResponseEntity<String> uploadEventPhoto(@PathVariable String eventId, @RequestParam("file") MultipartFile file) {
        eventserv.uploadEventPhoto(eventId, file);
        return ResponseEntity.ok("Photo uploaded successfully");
    }

    @GetMapping("/contenu/{idevent}")
    public ResponseEntity<byte[]> getFileContentByEventId(@PathVariable String idevent) {
        try {
            String fileName = eventserv.getphotoByEventId(idevent);
            if (fileName == null) {
                log.error("Event with ID {} does not exist or has no photo.", idevent);
                return ResponseEntity.notFound().build();
            }

            Path filePath = Paths.get(env.getProperty("file.upload-dir1")).resolve(fileName).normalize();

            if (!Files.exists(filePath)) {
                log.error("File not found: {}", filePath);
                return ResponseEntity.notFound().build();
            }

            byte[] fileContent = Files.readAllBytes(filePath);
            String mimeType = Files.probeContentType(filePath);
            mimeType = (mimeType != null) ? mimeType : MediaType.APPLICATION_OCTET_STREAM_VALUE;

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(mimeType))
                    .body(fileContent);
        } catch (IOException e) {
            log.error("Error reading file content for event with ID {}.", idevent, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


//    @GetMapping("/events")
//    public List<Event> getAllEventsSorted() {
//        return eventrepo.findAllByOrderByCreatedAtDesc();
//    }


//    @GetMapping("/top-participated-events")
//    public ResponseEntity<List<Event>> getTopParticipatedEvents(@RequestParam(defaultValue = "5") int limit) {
//        List<Event> events = registserv.getTopParticipatedEvents(limit);
//        if (events.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(events);
//    }
}
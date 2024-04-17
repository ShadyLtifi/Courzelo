package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.EventRegistration;
import tn.esprit.devflow.courzelo.repository.EventRegistRepository;
import tn.esprit.devflow.courzelo.services.EmailService;
import tn.esprit.devflow.courzelo.services.EventRegistService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EventRegistController {

    @Autowired
    EventRegistService registService;
    @Autowired
    EventRegistRepository resigrepo;
    @Autowired
    EmailService emailserv;


    @GetMapping
    public ResponseEntity<List<EventRegistration>> getAllEventRegistrations() {
        List<EventRegistration> registrations = registService.getAllEventRegistrations();
        if (registrations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(registrations);
    }
  /*  @PostMapping("/confirm-registration/{registrationId}")
    public ResponseEntity<?> confirmRegistration(@PathVariable String registrationId) {
        Optional<EventRegistration> registrationOpt = resigrepo.findById(registrationId);
        if (!registrationOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Registration not found");
        }
        EventRegistration registration = registrationOpt.get();
        registration.confirmRegistration();
        resigrepo.save(registration);
        emailserv.sendConfirmationEmail(registration.getUser().getEmail(), "Your registration has been confirmed!");
        return ResponseEntity.ok("Registration confirmed and email sent");
    }

*/
  @PostMapping("/confirm-registration/{registrationId}")
  public ResponseEntity<?> confirmRegistration(@PathVariable String registrationId) {
     return registService.confirmRegistration(registrationId);
  }
    @GetMapping("/events/top-participated")
    public ResponseEntity<List<Event>> getTopParticipatedEvents(@RequestParam(defaultValue = "10") int limit) {
        List<Event> events = registService.getTopParticipatedEvents(limit);
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(events);
    }


}

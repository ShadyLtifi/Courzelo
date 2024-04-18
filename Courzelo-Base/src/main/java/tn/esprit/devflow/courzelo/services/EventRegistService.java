package tn.esprit.devflow.courzelo.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.controller.EventController;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.EventRegistration;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.repository.EventRegistRepository;
import tn.esprit.devflow.courzelo.repository.EventRepository;
import tn.esprit.devflow.courzelo.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventRegistService {
    @Autowired
    UserRepository userrepo;
    @Autowired
    EventRepository eventrepo;
    @Autowired
    EventRegistRepository registrepo;
    @Autowired
    EmailService emailserv;
    @Autowired
    private JavaMailSender mailSender;
    private static final Logger log = LoggerFactory.getLogger(EventController.class);


//    public ResponseEntity<?> registerUserToEvents(String userId, List<String> eventIds) {
//        log.info("Starting event registration for user: " + userId);
//
//        // Static user creation for testing; replace with dynamic retrieval in production
//        User user = createStaticUser();
//
//
//        List<Event> events = eventrepo.findAllById(eventIds);
//        if (events.isEmpty()) {
//            return ResponseEntity.badRequest().body("No valid events found for the given IDs");
//        }
//
//        for (Event event : events) {
//            log.info("Current max capacity for event " + event.getIdevent() + " is " + event.getMaxcapacity());
//            if (event.getMaxcapacity() > 0) {
//                event.setMaxcapacity(event.getMaxcapacity() - 1);
//                eventrepo.save(event);
//                log.info("Decremented max capacity for event " + event.getIdevent() + " to " + event.getMaxcapacity());
//            } else {
//                log.info("Event " + event.getIdevent() + " is at full capacity");
//                // Optionally, stop processing further if one event cannot accommodate more attendees
//                return ResponseEntity.badRequest().body("Event with ID " + event.getIdevent() + " is at full capacity");
//            }
//        }
//
//        EventRegistration registration = new EventRegistration();
//        registration.setUser(user);
//        registration.setEvents(events);
//        registration.setRegistrationDate(LocalDate.now());
//        registration.setConfirmationStatus(false);
//
//        try {
//            EventRegistration savedRegistration = registrepo.save(registration);
//            return ResponseEntity.ok(savedRegistration);
//        } catch (Exception e) {
//            log.error("Failed to register user to events", e);
//            return ResponseEntity.internalServerError().body("Failed to register user to events due to an internal error: " + e.getMessage());
//        }
//    }
//

    // User

   /* public List<EventRegistration> getAllEventRegistrations() {
        List<EventRegistration> registrations = registrepo.findAll();
        registrations.forEach(registration -> {
            // Assuming you have methods in your services/repositories to find these by their IDs.
            List<Event> populatedEvents = registration.getEvents().stream()
                    .filter(Objects::nonNull)  // Add this line to filter out null event references
                    .map(eventRef -> eventrepo.findById(eventRef.getIdevent()))
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList());

            // Fetch and set the user similarly if needed
            userrepo.findById(registration.getUser().getIduser())
                    .ifPresent(registration::setUser);  // Only set the user if it is present
        });
        return registrations;
   }
*/


//    public List<EventRegistration> getAllEventRegistrations() {
//        // Retrieve all EventRegistration entries from the database
//        List<EventRegistration> registrations = registrepo.findAll();
//
//        // Create the static user
//        User staticUser = createStaticUser();
//
//        // Set the static user for each registration
//
//        registrations.forEach(registration -> {
//            // Set the static user for each registration
//            registration.setUser(staticUser);
//            registration.setUserEmail(staticUser.getEmail());
//
//            // Load the event details for each registration and filter out any null references
//            List<Event> populatedEvents = registration.getEvents().stream()
//                    .filter(Objects::nonNull)  // Skip null event references
//                    .map(eventRef -> eventrepo.findById(eventRef.getIdevent()).orElse(null))
//                    .filter(Objects::nonNull)  // Skip events not found in the repository
//                    .collect(Collectors.toList());
//
//            registration.setEvents(populatedEvents);
//        });
//
//        return registrations;
//    }


//    private User createStaticUser() {
//        User user = new User();
//        user.setIduser("staticUserId");  // Make sure this method name is correct
//        user.setEmail("static.email@example.com");
//        return user;
//    }


    /* user dyna
        public ResponseEntity<?> confirmRegistration(String registrationId) {
            User staticUser = createStaticUser();

            Optional<EventRegistration> registrationOpt = registrepo.findById(registrationId);
            if (!registrationOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Registration not found");
            }
            EventRegistration registration = registrationOpt.get();
            registration.confirmRegistration();
            registrepo.save(registration);
            emailserv.sendConfirmationEmail(registration.getUser().getEmail(), "Your registration has been confirmed!");
            return ResponseEntity.ok("Registration confirmed and email sent");
        }
    */
    private void sendConfirmationEmail() {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("static.email@example.com");  // Replace with your static email address
            message.setSubject("Registration Confirmation");
            message.setText("Your registration has been confirmed!");
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Failed to send email", e);
        }
    }

    public ResponseEntity<?> confirmRegistration(String registrationId) {
        Optional<EventRegistration> registrationOpt = registrepo.findById(registrationId);
        if (!registrationOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Registration not found");
        }
        EventRegistration registration = registrationOpt.get();
        registration.setConfirmationStatus(true);
        registrepo.save(registration);
        sendConfirmationEmail();  // Calling the modified email sending method
        return ResponseEntity.ok("Registration confirmed and email sent to static address");
    }

    //USER dynamique
    /* public ResponseEntity<?> registerUserToEvents(String userId, List<String> eventIds) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Event> events = eventRepository.findAllById(eventIds);
        if (events.isEmpty()) {
            return ResponseEntity.badRequest().body("Events not found");
        }

        for (Event event : events) {
            if (event.getMaxCapacity() <= 0) {
                return ResponseEntity.badRequest().body("Event " + event.getId() + " is at full capacity");
            }
            event.setMaxCapacity(event.getMaxCapacity() - 1);
            eventRepository.save(event);
        }

        EventRegistration registration = new EventRegistration();
        registration.setUser(user.get());
        registration.setEvents(events);
        registration.setRegistrationDate(LocalDate.now());
        registration.setConfirmationStatus(true);
        eventRegistrationRepository.save(registration);

        return ResponseEntity.ok("Registration successful");
    }*/
//    public List<Event> getTopParticipatedEvents(int limit) {
//        Pageable pageable = PageRequest.of(0, limit);
//        return eventrepo.findTopEvents(pageable);
//    }
}
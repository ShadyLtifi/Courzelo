package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.EventRegistration;
import tn.esprit.devflow.courzelo.entity.Speaker;
import tn.esprit.devflow.courzelo.entity.User;
import tn.esprit.devflow.courzelo.repository.EventRegistRepository;
import tn.esprit.devflow.courzelo.repository.EventRepository;
import tn.esprit.devflow.courzelo.repository.SpeakerRepository;
import tn.esprit.devflow.courzelo.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;

@Service
public class EventService implements IEventService {
    @Autowired
    EventRepository eventrepo;
    @Autowired
    SpeakerRepository speakerrepo;
    @Autowired
    private Environment env;
    @Autowired
    UserRepository userrepo;
    @Autowired
    EventRegistRepository registrepo;
    @Override
    public Event addEvent(Event e) {


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
    public Event retrieveEvent(String idevent) {
        Event e = eventrepo.findById(idevent).get();
        return e;

    }


    @Override
    public Event addEventWithSpeaker(Event event, String name) {
        Speaker speaker = speakerrepo.findSpeakerByName(name); // Assurez-vous que cette méthode existe dans votre repository
        if (speaker != null) {
            event.setSpeaker(speaker); // Assurez-vous que votre classe Event a une relation avec Speaker et les setters/getters appropriés
            return eventrepo.save(event);
        } else {
            return null; // Ou lancez une exception si le speaker n'existe pas
        }


    }

    @Override
    public List<Event> searchEventsByTitle(String title) {
        return eventrepo.findByTitleContainingIgnoreCase(title);

    }

    @Override
    public String uploadEventPhoto(String eventId, MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Failed to store empty file.");
        }

        try {
            String uploadDir = env.getProperty("file.upload-dir");
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Générer un nom de fichier unique
            String filename = eventId + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);

            // Copier le fichier dans le répertoire de destination
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Récupérez l'événement par eventId et mettez à jour avec le chemin du fichier
            Event event = eventrepo.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
            event.setPhoto(filePath.toString());
            eventrepo.save(event);

            return filePath.toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file.", e);
        }



    }


    public String getphotoByEventId(String idevent) {
        // Implémentez la logique pour récupérer le nom du fichier à partir de l'ID de la leçon
        Event event = eventrepo.findById(idevent).orElse(null);
        if (event != null) {
            // Supposons que le nom du fichier est stocké dans l'entité Lesson
            return event.getPhoto();
        } else {
            // Gérer le cas où la leçon avec l'ID donné n'existe pas
            return null;
        }
    }




}








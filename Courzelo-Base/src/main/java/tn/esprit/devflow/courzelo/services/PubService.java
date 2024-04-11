package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.entity.Publication;
import tn.esprit.devflow.courzelo.repository.LessonRepository;
import tn.esprit.devflow.courzelo.repository.PubRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PubService implements IPubService {
    @Autowired
    PubRepository pubRepository;
    @Autowired
    LessonRepository lessonRepository;
    @Override
    public List<Publication> retrieveAllPublication() {
        return pubRepository.findAll();
    }

    @Override
    public Publication addPublication(Publication Publication) {
        Publication.setDatepub(LocalDate.now());
        return pubRepository.save(Publication);
    }

    @Override
    public Publication updatePublication(Publication Publication) {
        return pubRepository.save(Publication);
    }

    @Override
    public void deletePublication(String idpub) {
pubRepository.deleteById(idpub);
    }

    @Override
    public Publication retrievePublication(String idpub) {
        Optional<Publication> pubOptional = pubRepository.findById(idpub);
        return pubOptional.get();
    }

//@Override
//    public Publication createPublication(String lessonId, String message) {
//        Optional<Lesson> lessonOptional = lessonRepository.findById(lessonId);
//        if (lessonOptional.isPresent()) {
//            Lesson lesson = lessonOptional.get();
//
//            Publication publication = new Publication();
//            publication.setMessage(message);
//            publication.setDatepub(LocalDate.now());
//            publication.setLesson(lesson);
//
//            return pubRepository.save(publication);
//        }
//        throw new IllegalArgumentException("Lesson not found with id: " + lessonId);
//    }
//
//    public Publication addPublicationWithLesson(Publication publication, Lesson lesson) {
//        if (lesson != null) {
//            Lesson savedLesson = lessonRepository.save(lesson);
//            publication.setLesson(savedLesson);
//        }
//        publication.setDatepub(LocalDate.now()); // Set publication date
//        return pubRepository.save(publication);
//    }


    public Publication addLessonAsPublication(Lesson lesson) {
        // Créer une nouvelle publication avec le cours
        Publication publication = new Publication();
        publication.setMessage(lesson.getContent()); // Vous pouvez définir d'autres propriétés de la publication ici

        // Enregistrer le cours s'il n'existe pas déjà
        Lesson savedLesson = lessonRepository.save(lesson);

        // Associer le cours à la publication
        publication.setLesson(savedLesson);

        // Enregistrer la publication
        return pubRepository.save(publication);
    }



}

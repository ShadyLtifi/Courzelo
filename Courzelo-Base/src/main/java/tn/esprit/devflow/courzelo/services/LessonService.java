package tn.esprit.devflow.courzelo.services;




import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import tn.esprit.devflow.courzelo.entity.*;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.repository.ClassRepository;
import tn.esprit.devflow.courzelo.repository.CourseRepository;
import tn.esprit.devflow.courzelo.repository.LessonRepository;
import tn.esprit.devflow.courzelo.repository.ProgramRepository;

import java.net.MalformedURLException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Slf4j
@Service
public class LessonService implements  ILessonService{
    @Autowired
    LessonRepository lessonRepository;
    @Autowired
    private Environment env;
    @Autowired
    ProgramRepository programRepository;
    @Autowired
    ClassRepository classRepository;
    @Override
    public List<Lesson> retrieveAllLesson() {
        return lessonRepository.findAll();
    }

    @Override
    public Lesson addLesson(Lesson Lesson) {
        return lessonRepository.save(Lesson);
    }

    @Override
    public Lesson updateLesson(Lesson Lesson) {
        return lessonRepository.save(Lesson);
    }

    @Override
    public void deleteLesson(String idlesson) {
lessonRepository.deleteById(idlesson);
    }

    @Override
    public Lesson retrieveLesson(String idlesson) {
        Optional<Lesson> lessonOptional = lessonRepository.findById(idlesson);
        return lessonOptional.get();
    }
    public Lesson uploadFile(MultipartFile file, String title) {
        try {
            // Normalize file name
            String content = StringUtils.cleanPath(file.getOriginalFilename());
            Path fileStorageLocation = Paths.get(env.getProperty("file.upload-dir"))
                    .toAbsolutePath().normalize();
            Path targetLocation = fileStorageLocation.resolve(content);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Créer une nouvelle leçon avec le contenu du fichier et le titre, puis sauvegarder dans la base de données
            Lesson newLesson = new Lesson(content);
            newLesson.setTitle(title);  // Ajoutez cette ligne pour mettre à jour le titre
            return lessonRepository.save(newLesson);
        } catch (Exception ex) {
            System.out.println("Exception: " + ex.getMessage());
            ex.printStackTrace();
            return null;
        }
    }

    public String getFileContent(String content) {
        try {
            Path filePath = Paths.get(env.getProperty("file.upload-dir")).resolve(content);
            return new String(Files.readAllBytes(filePath), StandardCharsets.UTF_8);
        } catch (IOException e) {
            log.error("Error reading file content for {}.", content, e);
            return null;
        }
    }


    public List<String> getFiles() throws IOException {

        return Files.walk(Paths.get(env.getProperty("file.upload-dir")))
                .filter(Files::isRegularFile)
                .map(file -> file.getFileName().toString())
                .collect(Collectors.toList());
    }




    public Resource loadFileAsResource(String content) throws MalformedURLException {
        Path fileStorageLocation = Paths.get(env.getProperty("file.upload-dir"))
                .toAbsolutePath().normalize();
        Path filePath = fileStorageLocation.resolve(content).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists()) {
            return resource;
        }
        return null;
    }
    @Autowired
    private CourseRepository courseRepository;

    public Lesson addLessonBySpecialityAndLevel(Speciality speciality, Level level, Lesson newLesson) {
        // Créer une nouvelle leçon avec la spécialité donnée
        newLesson.setSpeciality(speciality);

        // Trouver la classe correspondant au niveau donné
        Class classe = classRepository.findByLevel(level);

        if (classe != null) {
            // Si une classe est trouvée, lier la leçon à cette classe
            newLesson.setClasse(classe);
        } else {
            // Sinon, créer une nouvelle classe pour le niveau donné
            classe = new Class();
            classe.setLevel(level);
            classRepository.save(classe);
            newLesson.setClasse(classe);
        }

        // Enregistrer la leçon dans la base de données
        return lessonRepository.save(newLesson);
    }




}




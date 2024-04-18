package tn.esprit.devflow.courzelo.controller;

import groovy.util.logging.Slf4j;

import org.springframework.core.io.Resource;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.core.env.Environment;

import org.springframework.http.HttpHeaders;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.entity.Level;
import tn.esprit.devflow.courzelo.entity.Module;
import tn.esprit.devflow.courzelo.entity.Speciality;
import tn.esprit.devflow.courzelo.repository.LessonRepository;
import tn.esprit.devflow.courzelo.services.ILessonService;
import tn.esprit.devflow.courzelo.services.LessonService;


import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LessonController {
    private static final Logger logger = LoggerFactory.getLogger(LessonController.class);
    private static final Logger log = LoggerFactory.getLogger(LessonController.class);
    @Autowired
    private Environment env;
    @Autowired
    ILessonService lessonService;
    @Autowired
    LessonService lessonServ;
@Autowired
    LessonRepository lessonRepository;
    @PostMapping("/addLesson")
    public Lesson addLesson(@RequestBody Lesson l) {
        return lessonService.addLesson(l);
    }

    @GetMapping("/retrieveallLesson")
    @ResponseBody
    public List<Lesson> getLesson() {

        List<Lesson> listLesson = lessonService.retrieveAllLesson();

        return listLesson ;

    }
    @PutMapping("/updateLesson/{idlesson}")

    @ResponseBody
    public Lesson modifyLesson(@RequestBody Lesson l) {

        return lessonService.updateLesson(l);

    }
    @DeleteMapping("/DeleteLesson/{idlesson}")

    @ResponseBody

    public void deleteLesson(@PathVariable String idlesson) {

        lessonService.deleteLesson(idlesson);

    }

    @GetMapping("/retrieveLesson/{Lessonid}")
    @ResponseBody

    public Lesson retrieveLesson (@PathVariable ("Lessonid")String idlesson) {
        return lessonService.retrieveLesson(idlesson);
    }


    @PostMapping(value = "/uploadContent", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Lesson> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("title") String title) {
        Lesson uploadedLesson = lessonServ.uploadFile(file, title);
        if (uploadedLesson != null) {
            return ResponseEntity.ok(uploadedLesson);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/downloadFile/{content}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String content, HttpServletRequest request) throws MalformedURLException {
        Resource resource = lessonServ.loadFileAsResource(content);
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }
        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; content=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/contents/{lessonId}")
    public ResponseEntity<byte[]> getFileContentByLessonId(@PathVariable String lessonId) {
        try {
            // Obtenez le nom du fichier à partir de l'ID de la leçon
            String fileName = lessonServ.getContentByLessonId(lessonId);
            Path filePath = Paths.get(env.getProperty("file.upload-dir")).resolve(fileName);
            byte[] fileContent = Files.readAllBytes(filePath);

            HttpHeaders headers = new HttpHeaders();
            String mimeType = Files.probeContentType(filePath);
            if (mimeType == null) {
                mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }
            headers.setContentType(MediaType.parseMediaType(mimeType));

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(fileContent);
        } catch (IOException e) {
            log.error("Error reading file content for lesson with ID {}.", lessonId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    // Méthode pour déterminer le type MIME en fonction de l'extension du fichier
    private String determineMimeType(String fileName) {
        if (fileName.endsWith(".png")) {
            return "image/png";
        } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (fileName.endsWith(".mp4")) {
            return "video/mp4";
        } else if (fileName.endsWith(".pdf")) {
            return "application/pdf";
        } else {
            // Si le type de fichier n'est pas reconnu, retournez un type MIME générique
            return "application/octet-stream";
        }
    }



    @PostMapping("/addLessonBySpecialityAndLevel")
    public ResponseEntity<Lesson> addLessonBySpecialityAndLevel(
            @RequestParam("speciality") Speciality speciality,
            @RequestParam("level") Level level,
            @RequestBody Lesson newLesson) {

        // Vérifier si la spécialité et le niveau sont valides
        if (speciality == null || level == null) {
            return ResponseEntity.badRequest().build();
        }

        // Ajouter le cours en spécifiant la spécialité et le niveau
        Lesson addedLesson = lessonServ.addLessonBySpecialityAndLevel(speciality, level, newLesson);

        // Vérifier si le cours a été ajouté avec succès
        if (addedLesson != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(addedLesson);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/lessons/{speciality}/{level}")
    public List<Lesson> getLessonsBySpecialityAndLevel(@PathVariable("speciality") Speciality speciality, @PathVariable("level") Level level) {
        return lessonServ.getLessonsBySpecialityAndLevel(speciality, level);
    }

@GetMapping("/lessons/module/{moduleId}")
public List<Lesson> getLessonsByModule(@PathVariable("moduleId") String moduleId) {
    // Utilisez le service pour récupérer les leçons par module
    Module module = new Module(); // Utilisez le constructeur avec un ID
    return lessonServ.getLessonsByModule(module);
}

    @GetMapping("/class/{level}/{speciality}")
    public ResponseEntity<List<Lesson>> getLessonOfClassByLevelAndSpeciality(
            @PathVariable Level level, @PathVariable Speciality speciality) {
        List<Lesson> lessons = lessonServ.getLessonOfClassByLevelAndSpeciality(level, speciality);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/{classId}/lessons")
    public ResponseEntity<List<Lesson>> getLessonsByClassId(@PathVariable String classId) {
        List<Lesson> lessons = lessonServ.getLessonsByClassId(classId);
        return ResponseEntity.ok(lessons);
    }

    private String determineContentType(String content) {
        String extension = content.substring(content.lastIndexOf(".") + 1);
        switch (extension.toLowerCase()) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
                return "image";
            case "pdf":
                return "pdf";
            default:
                return "fichier";
        }
    }

@GetMapping("/lesson/{title}")
public ResponseEntity<?> getLessonContent(@PathVariable String title) {
    try {
        // Récupérer le contenu de la base de données en fonction du titre
        Lesson lesson = lessonRepository.findByTitle(title);

        if (lesson != null) {
            // Récupérer le contenu de la leçon
            String contentType = lesson.getType();
            byte[] content = lesson.getContent().getBytes();

            HttpHeaders headers = new HttpHeaders();
            // Définir le type de contenu en fonction du type récupéré de la base de données
            headers.setContentType(MediaType.parseMediaType(contentType));

            // Retourner le contenu de la leçon
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(content);
        } else {
            // Si la leçon n'est pas trouvée, retourner une réponse appropriée
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        log.error("Error fetching lesson content for {}.", title, e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}



}

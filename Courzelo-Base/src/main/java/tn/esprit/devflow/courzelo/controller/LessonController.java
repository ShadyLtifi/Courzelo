package tn.esprit.devflow.courzelo.controller;

import groovy.util.logging.Slf4j;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import org.springframework.core.env.Environment;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.services.ILessonService;
import tn.esprit.devflow.courzelo.services.LessonService;


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


    @PostMapping(value = "/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Lesson> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("title") String title) {
        Lesson uploadedLesson = lessonServ.uploadFile(file, title);
        if (uploadedLesson != null) {
            return ResponseEntity.ok(uploadedLesson);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Displays the list of uploaded files.
    @GetMapping("/getFiles")
    public List<String> getFiles() throws IOException {
        return lessonServ.getFiles();
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
    @GetMapping("/content/{content}")
    public ResponseEntity<byte[]> getFileContent(@PathVariable String content) {
        try {
            Path filePath = Paths.get(env.getProperty("file.upload-dir")).resolve(content);
            byte[] fileContent = Files.readAllBytes(filePath);

            HttpHeaders headers = new HttpHeaders();
            // Déterminez le type MIME du fichier
            String mimeType = Files.probeContentType(filePath);
            // Si le type MIME ne peut pas être déterminé, utilisez un type MIME par défaut
            if (mimeType == null) {
                mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }
            headers.setContentType(MediaType.parseMediaType(mimeType));

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(fileContent);
        } catch (IOException e) {
            log.error("Error reading file content for {}.", content, e);
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

}

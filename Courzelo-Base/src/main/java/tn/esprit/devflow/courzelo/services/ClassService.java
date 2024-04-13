package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.entity.Level;
import tn.esprit.devflow.courzelo.entity.Speciality;
import tn.esprit.devflow.courzelo.repository.ClassRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService implements IClassService{
    @Autowired
    ClassRepository  classRepository;
    @Override
    public List<Class> retrieveAllClass() {
        return classRepository.findAll();
    }

    @Override
    public Class addClass(Class classe) {
        return classRepository.save(classe);
    }

    @Override
    public Class updateClass(Class classe) {
        return classRepository.save(classe);
    }

    @Override
    public void deleteClass(String idClass) {
         classRepository.deleteById(idClass);
    }

    @Override
    public Class retrieveClass(String idClass) {
        Optional<Class> classOptional = classRepository.findById(idClass);
        return classOptional.get();
    }

    public void addLessonToClass(String classId, Lesson lesson) {
        Class classe = classRepository.findById(classId).orElse(null);
        if (classe != null) {
            classe.addLesson(lesson);
            classRepository.save(classe);
        } else {
            // Gérer le cas où la classe n'est pas trouvée
        }
    }

    public void addLessonToClassByLevelAndSpeciality(Level level, Speciality speciality, Lesson lesson) {
        List<Class> classes = classRepository.findBySpecialityAndLevel(speciality, level);
        for (Class classe : classes) {
            classe.addLesson(lesson);
            classRepository.save(classe);
        }
    }

}

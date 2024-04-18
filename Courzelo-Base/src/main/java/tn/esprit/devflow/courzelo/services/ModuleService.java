package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.*;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Module;
import tn.esprit.devflow.courzelo.repository.ClassRepository;
import tn.esprit.devflow.courzelo.repository.LessonRepository;
import tn.esprit.devflow.courzelo.repository.ModuleRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ModuleService implements IModuleService{
    @Autowired
    ModuleRepository moduleRepository;
    @Autowired
    ClassRepository classRepository;
    @Autowired
    LessonRepository lessonRepository;
    @Override
    public List<Module> retrieveAllModule() {
        return moduleRepository.findAll();
    }

    @Override
    public Module addModule(Module Module) {
        return moduleRepository.save(Module);
    }

    @Override
    public Module updateModule(Module Module) {
        return moduleRepository.save(Module);
    }

    @Override
    public void deleteModule(String idmodule) {
moduleRepository.deleteById(idmodule);
    }

    @Override
    public Module retrieveModule(String idmodule) {
        Optional<Module> moduleOptional = moduleRepository.findById(idmodule);
        return moduleOptional.get();
    }
    public Module addModuleBySpeciality(Speciality speciality, Module newModule) {
        // Assurez-vous que la spécialité et le module ne sont pas nuls
        if (speciality == null || newModule == null) {
            return null; // Ou lancez une exception appropriée
        }

        // Trouver la classe correspondant à la spécialité donnée
        Class classe = classRepository.findBySpeciality(speciality);

        if (classe != null) {
            // Si une classe est trouvée, associez le module à cette classe
            newModule.setClasses(classe);
        } else {
            // Sinon, créer une nouvelle classe pour la spécialité donnée
            classe = new Class();
            classe.setSpeciality(speciality);
            classRepository.save(classe);
            newModule.setClasses(classe);
        }

        // Enregistrez le module dans la base de données
        return moduleRepository.save(newModule);
    }

    public Module addModuleBySpecialityAndLevel(Speciality speciality, Level level, Module newModule) {
        // Assurez-vous que la spécialité et le module ne sont pas nuls
        if (speciality == null || newModule == null) {
            return null; // Ou lancez une exception appropriée
        }

        // Trouver la classe correspondant à la spécialité donnée
        Class classe = classRepository.findByLevelAndAndSpeciality(level, speciality);

        if (classe != null) {
            // Si une classe est trouvée, associez le module à cette classe
            newModule.setClasses(classe);

        } else {
            // Sinon, créer une nouvelle classe pour la spécialité donnée
            classe = new Class();
            classe.setSpeciality(speciality);
            classe.setLevel(level);

            classRepository.save(classe);
            newModule.setClasses(classe);
        }

        // Enregistrez le module dans la base de données
        return moduleRepository.save(newModule);
    }
//    public List<Module> getModulesBySpeciality(Speciality speciality) {
//        // Récupérer la classe correspondant à la spécialité
//        Class classe = classRepository.findBySpeciality(speciality);
//        if (classe != null) {
//            // Récupérer les modules associés à cette classe
//            return classe.getModules();
//        } else {
//            // Si aucune classe correspondant à la spécialité n'est trouvée, retourner une liste vide
//            return new ArrayList<>();
//        }
//}

//
public List<Module> getModulesBySpeciality(Speciality speciality) {
    // Recherche des classes correspondant à la spécialité donnée
    List<Class> classes = (List<Class>) classRepository.findAllBySpeciality(speciality);

    List<Module> modules = new ArrayList<>();

    for (Class classe : classes) {
        // Pour chaque classe trouvée, récupérer les modules associés à cette classe
        List<Module> modulesOfClass = moduleRepository.findByClasses(classe);
        modules.addAll(modulesOfClass);
    }

    return modules;
}


    public List<Module> getModuleBySpecialityAndLevel(Speciality speciality, Level level) {
        // Récupérer la classe correspondant à la spécialité et au niveau
        Class classe = classRepository.findByLevelAndAndSpeciality(level , speciality);
        if (classe != null) {
            // Récupérer les leçons associées à cette classe
            return moduleRepository.findByClasses(classe);
        } else {
            // Si aucune classe correspondant à la spécialité et au niveau n'est trouvée, retourner une liste vide
            return new ArrayList<>();
        }
    }

    public Module addLessonToModule(String idmodule, String idlesson) {
        Module module = moduleRepository.findById(idmodule).orElse(null);
        Lesson lesson = lessonRepository.findById(idlesson).orElse(null);

        if (module != null && lesson != null) {
            module.addLesson(lesson);
            return moduleRepository.save(module);
        } else {
            // Gérer le cas où le module ou le lesson n'est pas trouvé
            return null;
        }
    }
    public Module getModuleWithLesson(String moduleId) {
        return moduleRepository.findById(moduleId).orElse(null);
    }
}

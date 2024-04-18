package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Level;
import tn.esprit.devflow.courzelo.entity.Speciality;

import java.util.List;

@Repository
public interface ClassRepository extends MongoRepository<Class,String> {
    Class findByLevel(Level level);
    List<Class> findBySpecialityAndLevel(Speciality speciality, Level level);

    Class findBySpeciality(Speciality speciality);
    Class findAllBySpeciality(Speciality speciality);
    Class findByLevelAndAndSpeciality (Level level , Speciality speciality);
}

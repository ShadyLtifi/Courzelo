package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Module;

import java.util.List;

@Repository
public interface ModuleRepository extends MongoRepository<Module,String> {
    List<Module> findByClasses (Class classe);
}

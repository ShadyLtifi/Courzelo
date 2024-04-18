package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.devflow.courzelo.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface UserRepository extends MongoRepository<User,String> {

    User findUserById(String id);
    User findUserByUsername(String username);
    User findByEmail(String email);
    boolean existsByEmail(String email);
    User findByVerificationToken(String verificationToken);
    List<User> findByLastLoginBefore(LocalDate date);

}

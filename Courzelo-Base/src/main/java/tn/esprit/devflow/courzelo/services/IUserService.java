package tn.esprit.devflow.courzelo.services;


import tn.esprit.devflow.courzelo.entity.Roles;
import tn.esprit.devflow.courzelo.entity.User;

import java.util.List;

public interface IUserService {
     User findByEmail(String email);
     User updateUser (User user);
     void changePassword(String email, String newPassword, String oldPssword);
     User enableOrDisable(String id);
     void saveVerificationToken(String id,String verfi);
     User findByVerificationToken(String verificationToken);
     void disableInactiveAccounts();
     User findbyUsername(String username);

     List<User> retrieveAllUser();


    void deleteUser(String Id);

    Roles getRoleByUsername(String username);
}

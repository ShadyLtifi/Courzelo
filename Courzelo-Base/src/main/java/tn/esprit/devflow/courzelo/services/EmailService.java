package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.User;


@Service
public class EmailService {

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender userMailSender;

    @Value("${spring.mail.username}")
    private String fromMail;

    public void sendCodeByMail(String email) {
        User user = userService.findByEmail(email);
        if (user != null && user.getId() != null) { // Check if user exists
            String verificationToken = user.getVerificationToken();

            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(fromMail);
            simpleMailMessage.setSubject("Vérification du compte");
            simpleMailMessage.setText("Bonjour " + user.getNom() + ",\n\n" +
                    "Veuillez cliquer sur le lien ci-dessous pour activer votre compte :\n\n" +
                    "http://localhost:6085/verify?verificationToken=" + verificationToken);
            simpleMailMessage.setTo(email);
            userMailSender.send(simpleMailMessage);
        } else {

        }
    }
}
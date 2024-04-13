package tn.esprit.devflow.courzelo.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Notification;

@Slf4j
@Service
public class NotificationService {
    public void sendNotification(Notification notification) {
        // Implémentez ici la logique pour envoyer la notification
        System.out.println("Notification envoyée à " + notification.getRecipient() + ": " + notification.getContent());
    }
}

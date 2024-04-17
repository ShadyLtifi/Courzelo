package tn.esprit.devflow.courzelo.entity;

import java.util.List;

public class RegistrationRequest {
    private String userId; // Utiliser une propriété pour l'ID de l'utilisateur
    private List<String> eventIds;

    // Constructeurs
    public RegistrationRequest() {
    }

    public RegistrationRequest(String userId) {
        this.userId = userId;
    }

    // Getters et Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    public List<String> getEventIds() {
        return eventIds;
    }

    public void setEventIds(List<String> eventIds) {
        this.eventIds = eventIds;
    }
}


package tn.esprit.devflow.courzelo.entity;

import java.util.function.Consumer;

public enum Roles {
    ADMIN,ETUDIANT,ENSEIGNANT,PARTENAIRE,PARTNER;


    public static void forEach(Consumer<Roles> action) {
        for (Roles role : values()) {
            action.accept(role);
        }
    }
}

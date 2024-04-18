package tn.esprit.devflow.courzelo.entity;

import java.util.function.Consumer;

public enum Roles {
    ADMIN,
    TEACHER,
    STUDENT,
    PARTNER;

    public static void forEach(Consumer<Roles> action) {
        for (Roles role : values()) {
            action.accept(role);
        }
    }
}

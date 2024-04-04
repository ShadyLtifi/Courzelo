package tn.esprit.devflow.courzelo.entity;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document
@FieldDefaults(level= AccessLevel.PRIVATE)

public class Comment {
    @Id
    String idComment;
    String message;
    Date datecomment;
    @DBRef
   Publication publication;
    @DBRef
    Comment parentComment; // Champ pour représenter le commentaire parent
    @DBRef
    List<Comment> replies; // Champ pour stocker les réponses
}


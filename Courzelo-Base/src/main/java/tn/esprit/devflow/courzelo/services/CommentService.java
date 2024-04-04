package tn.esprit.devflow.courzelo.services;

import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Comment;
import tn.esprit.devflow.courzelo.entity.Publication;
import tn.esprit.devflow.courzelo.repository.CommentRepository;
import tn.esprit.devflow.courzelo.repository.PubRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class CommentService implements ICommentService{

    @Autowired
    CommentRepository commentRepository;
    @Autowired
    PubRepository publicationRepository;
    @Override
    public List<Comment> retrieveAllComment() {
        return commentRepository.findAll();
    }

    @Override
    public Comment addComment(Comment Comment) {
        return commentRepository.save(Comment);
    }

    @Override
    public Comment updateComment(Comment Comment) {
        return commentRepository.save(Comment);
    }

    @Override
    public void deleteComment(String idComment) {
commentRepository.deleteById(idComment);
    }

    @Override
    public Comment retrieveComm(String idComment) {
        Optional<Comment> commentOptional = commentRepository.findById(idComment);
        return commentOptional.get();
    }
    public Comment addCommentToPublication(String publicationId, Comment comment) {
        // Recherche de la publication correspondante dans la base de données
        Optional<Publication> optionalPublication = publicationRepository.findById(publicationId);
        if (optionalPublication.isPresent()) {
            // La publication existe, associez le commentaire à cette publication
            Publication publication = optionalPublication.get();
            comment.setPublication(publication);
            // Enregistrez le commentaire dans la base de données
            Comment addedComment = commentRepository.save(comment);
            return addedComment;
        } else {
            // La publication n'existe pas, lancez une exception ou renvoyez null
            return null;
        }
    }
//    public Comment addReplyToComment(String commentId, Comment reply) {
//        // Trouver le commentaire parent par son ID
//        Comment parentComment = commentRepository.findById(commentId)
//                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));
//
//        // Ajouter la réponse au commentaire parent
//        List<Comment> replies = parentComment.getReplies();
//        replies.add(reply);
//        parentComment.setReplies(replies);
//
//        // Mettre à jour le commentaire parent dans la base de données
//        return commentRepository.save(parentComment);
//    }
@Override
public Comment addReplyToComment(String commentId, Comment reply) {
    Comment parentComment = commentRepository.findById(commentId).orElse(null);
    if (parentComment != null) {
        List<Comment> replies = parentComment.getReplies();
        if (replies == null) {
            replies = new ArrayList<>(); // Initialisez la liste si elle est null
            parentComment.setReplies(replies); // Définissez la liste initialisée sur le commentaire parent
        }
        replies.add(reply); // Ajoutez la réponse à la liste de réponses
        commentRepository.save(parentComment); // Enregistrez les modifications dans la base de données
        return reply; // Retournez la réponse ajoutée
    } else {
        throw new IllegalArgumentException("Parent comment with ID " + commentId + " not found");
    }
}

}

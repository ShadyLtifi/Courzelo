package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Comment;
import tn.esprit.devflow.courzelo.services.ICommentService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {
@Autowired
    ICommentService commentService;

    @PostMapping("/addComment")
    public Comment addComment(@RequestBody Comment c) {
        return commentService.addComment(c);
    }

    @GetMapping("/retrieveallcomments")
    @ResponseBody
    public List<Comment> getComment() {

        List<Comment> listComment = commentService.retrieveAllComment();

        return listComment ;

    }
    @PutMapping("/updateComment/{idComment}")

    @ResponseBody
    public Comment modifyComment(@RequestBody Comment c) {

        return commentService.updateComment(c);

    }
    @DeleteMapping("/DeleteComment/{idComment}")

    @ResponseBody

    public void deleteComment(@PathVariable String idComment) {

        commentService.deleteComment(idComment);

    }

    @GetMapping("/retrieveComment/{commentid}")
    @ResponseBody

    public Comment retrieveComment (@PathVariable ("commentid")String idComment) {
        return commentService.retrieveComm(idComment);
    }

    @PostMapping("/add/{publicationId}")
    public ResponseEntity<Comment> addCommentToPublication(@PathVariable String publicationId, @RequestBody Comment comment) {
        Comment addedComment = commentService.addCommentToPublication(publicationId, comment);
        return new ResponseEntity<>(addedComment, HttpStatus.CREATED);
    }

    @PostMapping("/{commentId}/replies")
    public ResponseEntity<Comment> addReplyToComment(@PathVariable String commentId, @RequestBody Comment reply) {
        Comment addedReply = commentService.addReplyToComment(commentId, reply);
        if (addedReply != null) {
            return ResponseEntity.ok(addedReply);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}

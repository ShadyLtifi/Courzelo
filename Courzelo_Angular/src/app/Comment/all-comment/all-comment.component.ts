import { Component } from '@angular/core';
import { CommentService } from 'src/app/Service/Forum/Comment/comment.service';

@Component({
  selector: 'app-all-comment',
  templateUrl: './all-comment.component.html',
  styleUrls: ['./all-comment.component.css']
})
export class AllCommentComponent {
  comment?: any[] =[];
  currentComment?: Comment;
  currentIndex = -1;
  constructor(private commentServ: CommentService) { }
  ngOnInit(): void {
    this.retrieveAllComment();
  }
  setActiveComment(c: Comment, index: number): void {
    this.currentComment = c;
    this.currentIndex = index;
  }
  retrieveAllComment(): void {
    this.commentServ.getAll()
      .subscribe(
        (data: Comment[]) => {
          this.comment = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        
        
  }
   
}

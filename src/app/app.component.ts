import { Component } from '@angular/core';
import { CommentService } from './comment.service';

export interface Comment {
  id:string,
  title:string,
  text:string,
  tags:string[],
  edit: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'comment-frontend';
  comments:Map<string, Comment>;
  
  private commentService: CommentService;
  constructor(private cs: CommentService) {
    this.commentService = cs;
  }
  ngOnInit(){
    this.updateCommentsFromServer();
  }
  updateCommentsFromServer(){
    this.commentService.getItems().subscribe(data => {
      console.log('AppComments.updateComments subscribe running');
      console.log(data);
      for( let record of data) {
        record[1].edit = false;
      }
      this.comments = data;
    });
  }
  startEdit(comment){
    if (comment.edit == true) {
      return;
    };
    comment.edit = true;
  }
  stopEdit(comment){
    if (comment.edit === false) {
      return;
    };
    comment.edit = false;
  }
}

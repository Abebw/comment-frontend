import { Component, ɵConsole } from '@angular/core';
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
  cancelEdit(comment){
    if (comment.edit === false) {
      return;
    };
    comment.edit = false;
  }
  saveEdit(comment) {
    console.log('app component saveEdit running');
    console.log(comment);
    if (comment.edit === false) {
      return;
    };
    this.comments.set(comment.id,   {
      id: comment.id,
      title: comment.title,
      text: comment.text,
      tags: comment.tags,
      edit: false
    });
    console.log(this.comments);

    console.error('abetest THIS SHOULD SYNC WITH SERVICE');
  }
}

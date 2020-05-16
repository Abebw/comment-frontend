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
  allTags:string[];
  tempComment:Comment;
  
  private commentService: CommentService;
  constructor(private cs: CommentService) {
    this.commentService = cs;
  }
  ngOnInit(){
    this.updateCommentsFromServer();
    this.initializeTempComment();
  }

  updateCommentsFromServer(){
    this.commentService.getItems().subscribe((data) => {
      let allTagsSet = new Set<string>();
      for( let record of data) {
        record[1].edit = false;
        for (let tag of record[1].tags){
          allTagsSet.add(tag);
        }
      }
      this.comments = data;
      this.allTags = [...allTagsSet];
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
  initializeTempComment(){
    this.tempComment = {
      id:'dummyID',
      title:'',
      text:'',
      tags:[],
      edit:true
    };
  }
  saveEdit(comment) {
    console.log('app component saveEdit running');
    console.log(comment);
    if (comment.edit === false) {
      return;
    };

    this.comments.set(comment.id,{
      id: comment.id,
      title: comment.title,
      text: comment.text,
      tags: comment.tags,
      edit: false
    });
    if (isNaN(comment.id)) {
      //TODO put a comment explaining this
      this.initializeTempComment();
    }
    this.commentService.saveItems(this.comments).subscribe((data) => this.updateCommentsFromServer());
  }
  deleteComment(comment) {
    console.log('app component delete comment running');
    this.comments.delete(comment.id);
    this.commentService.saveItems(this.comments).subscribe((data) => this.updateCommentsFromServer());
  }
}

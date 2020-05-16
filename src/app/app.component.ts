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
  tagSearch = '';
  comments:Map<string, Comment>;
  filteredComments:Comment[];
  allTags:string[];
  tempComment:Comment;
  
  private commentService: CommentService;
  constructor(private cs: CommentService) {
    this.commentService = cs;
    this.filteredComments = [];
  }
  ngOnInit(){
    this.updateCommentsFromServer();
    this.initializeTempComment();
  }
  updateFilteredComments(){
    console.log('updateFilteredComments running');
    console.log(this.tagSearch)
    this.filteredComments = [];
    for(let record of this.comments){
      if((this.tagSearch == '') || (record[1].tags.indexOf(this.tagSearch) != -1)){
        this.filteredComments.push(record[1]);
      }
    }
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
      this.updateFilteredComments();
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

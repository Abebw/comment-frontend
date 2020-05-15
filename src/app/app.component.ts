import { Component } from '@angular/core';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'comment-frontend';
  comments = [];
  private commentService: CommentService;
  constructor(private cs: CommentService) {
    this.commentService = cs;
  }
  ngOnInit(){
    this.commentService.getItems().subscribe(data => this.comments = data);;
  }
  startEdit(){
    console.log('catching start edit');
  }
}

import { Component } from '@angular/core';
import { CommentService } from './Comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'comment-frontend';
  comments = [];
  constructor(private commentService: CommentService) {
    this.comments = commentService.getItems();
  }
}

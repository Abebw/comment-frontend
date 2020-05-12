import { Component } from '@angular/core';
import { CommentService } from './Comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'comment-frontend';
  
  constructor(private commentService: CommentService) {
    console.log(commentService.getItems());
  }
}

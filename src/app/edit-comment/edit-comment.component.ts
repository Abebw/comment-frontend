import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass']
})
export class EditCommentComponent implements OnInit {
  @Input() comment;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-read-comment',
  templateUrl: './read-comment.component.html',
  styleUrls: ['./read-comment.component.sass']
})
export class ReadCommentComponent implements OnInit {
  @Input() comment;
  @Output() startEdit: EventEmitter<any> = new EventEmitter();

  constructor() { }
  editClickListener() {
    this.startEdit.emit(this.comment);
  }

  ngOnInit(): void {
  }

}

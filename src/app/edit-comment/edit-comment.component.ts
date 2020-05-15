import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef, Output } from '@angular/core';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass']
})
export class EditCommentComponent implements OnInit {
  @Input() comment;
  @Output() cancelEdit: EventEmitter<any> = new EventEmitter();
  tempData;


  constructor() {
  }

  ngOnInit(): void {
    this.tempData = JSON.parse(JSON.stringify(this.comment));
  }

  cancelClickListener() {
    this.cancelEdit.emit(this.comment);
  }
}

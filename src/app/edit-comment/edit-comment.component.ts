import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef, Output } from '@angular/core';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass']
})
export class EditCommentComponent implements OnInit {
  @Input() comment;
  @Output() stopEdit: EventEmitter<any> = new EventEmitter();


  constructor() {
  }

  ngOnInit(): void {
  }

  cancelClickListener() {
    this.stopEdit.emit(this.comment);
  }
}

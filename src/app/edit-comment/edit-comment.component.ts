import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';
@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass']
})


export class EditCommentComponent implements OnInit {
  //////// Fields
  @Input() comment;
  @Input() allTags: string[];
  @Input() hideCancel: boolean = false;
  @Output() cancelEdit: EventEmitter<any> = new EventEmitter();
  @Output() saveEdit: EventEmitter<any> = new EventEmitter();
  @Output() deleteComment: EventEmitter<any> = new EventEmitter();
  tempComment;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;


  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  //////// Constructors and initialization
  constructor() {
    if (this.allTags == null){
      this.allTags=[];
    }
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(): void {
    this.tempComment = JSON.parse(JSON.stringify(this.comment));
    this.tagCtrl.setValue(null);
  }

  //////// event listeners
  cancelClickListener() {
    this.cancelEdit.emit();
  }
  saveClickListener() {
    this.saveEdit.emit(this.tempComment);
  }
  deleteClickListener() {
    console.log('deleteClickListener running');
    this.deleteComment.emit();
  }
  //////// Tag code
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tempComment.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tempComment.tags.indexOf(tag);

    if (index >= 0) {
      this.tempComment.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tempComment.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}

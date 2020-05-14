import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Comment {
  id:string,
  title:string,
  text:string,
  tags:string[],
  edit:boolean
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  items = new Map<string, Comment>();
  
  getItems() {
    return Array.from(this.items).map((kvPair) => kvPair[1]);
  }
  addNewComment(comment){
    console.error('addNewComment unimplemented');
    // this.items.push(comment);
  }

  constructor(private http: HttpClient) { }

}
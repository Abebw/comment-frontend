import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { filter, map } from 'rxjs/operators';

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
  items:Map<string, Comment> = null;

  getItems(): Observable<any> {
    if (this.items === null) {
      return this.http.get<any>('./assets/mock-comments.json').pipe(map((response) => {
        this.items = new Map<string, Comment>(response);
        return response.map((kvPair) => kvPair[1]);
      }));
    }
    return of(Array.from(this.items).map((kvPair) => kvPair[1]));
  }
  addNewComment(comment){
    console.error('addNewComment unimplemented');
  }

  constructor(private http: HttpClient) {

   }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { filter, map } from 'rxjs/operators';

export interface dbComment {
  id:string,
  title:string,
  text:string,
  tags:string[]
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  items:Map<string, dbComment> = null;

  getItems(): Observable<any> {
    console.log('service.getItems running');
    if (this.items === null) {
      console.log('http.get observable initiating');
      return this.http.get<any>('./assets/mock-comments.json').pipe(map((response) => {
        this.items = new Map<string, dbComment>(response);
        // return response.map((kvPair) => kvPair[1]);
        console.log('service.getItems returning');
        return this.items;
      }));
    }
    return of(Array.from(this.items).map((kvPair) => kvPair[1]));
  }
  addNewComment(comment){
    console.error('addNewComment unimplemented');
  }
  updateComment(comment): Observable<any>{
    this.items.set(comment.id, comment);
    throw new Error('umimplemented')
    return;
  }


  constructor(private http: HttpClient) {

   }

}
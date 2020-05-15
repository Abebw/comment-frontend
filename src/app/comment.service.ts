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
  saveItems(comments):Observable<any> {
    console.log('service save items executing');
    for( let comment of comments) {
      if (isNaN(comment[0])){
        const newID = (this.maxId + 1) + '';
        this.maxId++;

        comment[0] = newID;
        comment[1].id = newID;
      }
      this.items.set(comment[0], {
        id: comment[1].id,
        title: comment[1].title,
        text: comment[1].text,
        tags: comment[1].tags
      })
    }
    return this.getItems();
  }

  items:Map<string, dbComment> = null;
  maxId:number;

  getItems(): Observable<any> {
    console.log('service.getItems running');
    if (this.items === null) {
      console.log('http.get observable initiating');
      return this.http.get<any>('./assets/mock-comments.json').pipe(map((response) => {
        this.items = new Map<string, dbComment>(response);
        this.maxId = this.items.size;
        console.log('service.getItems returning');
        return new Map(this.items);
      }));
    }
    return of(new Map(this.items));
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
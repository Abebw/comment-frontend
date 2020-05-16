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
    this.items = new Map();
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
    if (this.items === null) {
      return this.http.get<any>('./assets/mock-comments.json').pipe(map((response: dbComment[]) => {
        this.items = new Map<string, dbComment>();
        for (let item of response){
          this.items.set(item.id, item);
        }
        this.maxId = this.items.size;
        return new Map(this.items);
      }));
    }
    return of(new Map(this.items));
  }

  constructor(private http: HttpClient) {

   }
}
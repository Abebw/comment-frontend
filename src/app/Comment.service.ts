import { Injectable } from '@angular/core';

export interface Comment {
  id:string,
  title:string,
  text: string,
  tags:string[]
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  items:Comment[] = [ {
    id: '1',
    title: 'This is an item',
    text: 'This is a description of the item, it might describe a bug/task/comment, it can also display <a href="​www.google.com" ​ >Links</a>',
    tags: ['bug', 'issue', 'etc']
  }];
  
  getItems() {
    return this.items;
  }

  constructor() {}

}
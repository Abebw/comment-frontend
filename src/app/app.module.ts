import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { ReadCommentComponent } from './read-comment/read-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    EditCommentComponent,
    ReadCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCommentComponent } from './read-comment.component';

describe('ReadCommentComponent', () => {
  let component: ReadCommentComponent;
  let fixture: ComponentFixture<ReadCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsDeclarativeComponent } from './posts-declarative.component';

describe('PostsDeclarativeComponent', () => {
  let component: PostsDeclarativeComponent;
  let fixture: ComponentFixture<PostsDeclarativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsDeclarativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsDeclarativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

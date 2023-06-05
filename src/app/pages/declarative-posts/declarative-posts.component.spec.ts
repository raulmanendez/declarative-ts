import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarativePostsComponent } from './declarative-posts.component';

describe('DeclarativePostsComponent', () => {
  let component: DeclarativePostsComponent;
  let fixture: ComponentFixture<DeclarativePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclarativePostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclarativePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

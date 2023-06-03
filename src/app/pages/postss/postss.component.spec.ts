import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostssComponent } from './postss.component';

describe('PostssComponent', () => {
  let component: PostssComponent;
  let fixture: ComponentFixture<PostssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from 'src/app/model/post.model';
import { PostDeclarativeService } from 'src/app/services/post.declarative.service';
import { StudentDeclarativeService } from 'src/app/services/student.declarative';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent implements OnInit {

  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    student: new FormControl(''),
  });

  students$ = this.stduentService.students$
  constructor(
    private stduentService: StudentDeclarativeService,
    private postService: PostDeclarativeService
  ) {}

  ngOnInit(): void {}

  onAddPost() {
    let post= { } as Post;
    post.title = this.postForm.value.title 
    post.description = this.postForm.value.description 
    post.student = this.postForm.value.student 
    this.postService.addPost(post);
  }
}

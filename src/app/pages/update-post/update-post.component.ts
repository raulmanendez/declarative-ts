import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostDeclarativeService } from 'src/app/services/post.declarative.service';
import { StudentDeclarativeService } from 'src/app/services/student.declarative';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePostComponent {

  postId: string = '';
  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    student: new FormControl(''),
  });
  students$ = this.studentService.students$;

  post$ = this.postService.post$.pipe(
    tap((post) => {
      this.postId = post?.id + '';
      this.postForm.setValue({
        title: post?.title,
        description: post?.description,
        student: post?.student,
      });
    })
  );

  constructor(
    private studentService: StudentDeclarativeService,
    private postService: PostDeclarativeService
  ) {}

  onUpdatePost() {
    
    let post= { } as Post;
    post.id= this.postId
    post.title = this.postForm.value.title 
    post.description = this.postForm.value.description 
    post.student = this.postForm.value.student

    this.postService.updatePost(post);
  }
}

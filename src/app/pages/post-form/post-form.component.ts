import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineLatest, EMPTY, map, startWith, tap } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { NotificationService } from 'src/app/services/notification.service';
import { PostDeclarativeService } from 'src/app/services/post.declarative.service';
import { StudentDeclarativeService } from 'src/app/services/student.declarative';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit {

  postId = '';
  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    student: new FormControl(''),
  });

  selectedPostId = this.route.paramMap.pipe(
    map((paramMap) => {
      let id = paramMap.get('id');
      if (id) {
        this.postId = id;
      }
      this.postService.setPostId(id + '');
      return id;
    })
  );

  post$ = this.postService.post$.pipe(
    tap((post) => {
      post &&
        this.postForm.setValue({
          title: post?.title,
          description: post?.description,
          student: post?.student,
        });
    }),
    catchError((error) => {
      this.notificationService.setErrorMessage(error);
      return EMPTY;
    })
  );

  notification$ = this.postService.postCRUDCompleteAction$.pipe(
    startWith(false),
    tap((message) => {
      if (message) {
        this.router.navigateByUrl('/declarativeposts');
      }
    })
  );

  students$ = this.studentService.students$;

  vm$ = combineLatest([this.selectedPostId, this.post$, this.notification$]);

  constructor(
    private studentService: StudentDeclarativeService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private postService: PostDeclarativeService
  ) {}

  ngOnInit(): void {}

  onPostSubmit() {
    
    let post= { } as Post;
    
    post.title = this.postForm.value.title 
    post.description = this.postForm.value.description 
    post.student = this.postForm.value.student

    if (this.postId) {
      post.id= this.postId
      this.postService.updatePost(post);
    } else {
      this.postService.addPost(post);
    }
  }

}

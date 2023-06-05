import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, catchError, tap } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostDeclarativeService } from 'src/app/services/post.declarative.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostComponent {

  showUpdatePost = false;
  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessageAction$ = this.errorMessageSubject.asObservable();
  errorMessage = '';
  post$ = this.postService.post$.pipe(
    tap((post) => {
      this.showUpdatePost = false;
    }),
    catchError((error: string) => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );
  constructor(private postService: PostDeclarativeService) {}

  onUpdatePost() {
    this.showUpdatePost = true;
  }

  onDeletePost(post: Post) {
    if (confirm('R you sure you want to delete?')) {
      this.postService.deletePost(post);
    }
  }

}

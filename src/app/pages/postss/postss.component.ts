import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, Subject, catchError, combineLatest, map, shareReplay, tap } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { LoaderService } from 'src/app/services/loader.service';
import { PostDeclarativeService } from 'src/app/services/post.declarative.service';

@Component({
  selector: 'app-postss',
  templateUrl: './postss.component.html',
  styleUrls: ['./postss.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostssComponent {

  showAddPost = false;

  errorSubject=new Subject();
  errorObservable=this.errorSubject.asObservable();

  constructor(
    private loaderService:LoaderService,
    private postsDeclarativeService:PostDeclarativeService) {
      this.loaderService.startLoading()
     }

  post$=this.postsDeclarativeService.post$;
  posts$=this.postsDeclarativeService.allPosts$.pipe(
    tap(posts => {
      posts[0] && this.onSelectPost(posts[0])
    }),
    catchError((error) => {
      this.errorSubject.next(error)
      return EMPTY;
    }
  ))

  vm$ = combineLatest([this.posts$,this.post$]).pipe(
    tap(() => 
    setTimeout(() => {
      this.loaderService.stopLoading()  
    }, 0)
    ),
    map(([posts,post]) => {
      return { posts,post }
    })
  )

  onSelectPost(post:Post) {
    this.showAddPost = false;
    this.postsDeclarativeService.setPostId(post.id)
  }

  onAddPost() {
    this.showAddPost = true;
  }

}

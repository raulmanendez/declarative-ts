import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post-service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit,OnDestroy {

  posts:Post[]=[]
  subscription!:Subscription

  constructor(private postService:PostService,
    private changeDetectorRef:ChangeDetectorRef) { }
 
  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.subscription = this.postService.getPostsAlongStudents().subscribe(response => {
      this.posts=response;
      this.changeDetectorRef.detectChanges()//ChangeDetectionStrategy.OnPush:this is required
    })
  }

  ngOnDestroy(): void {
    //if we don't unsubscribe then http call will always complete
    //even if we move from component (http request will not get cancelled)
    this.subscription && this.subscription.unsubscribe()
  }

}

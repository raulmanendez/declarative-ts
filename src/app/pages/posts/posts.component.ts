import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post-service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit,OnDestroy {

  posts:Post[]=[]
  subscription!:Subscription

  constructor(private postService:PostService) { }
 
  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.subscription = this.postService.getPostsAlongStudents().subscribe(response => {
      this.posts=response;
    })
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe()
  }

}

import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostDeclarativeService } from 'src/app/services/post.declarative.service';

@Component({
  selector: 'app-postss',
  templateUrl: './postss.component.html',
  styleUrls: ['./postss.component.css']
})
export class PostssComponent {

  constructor(private postsDeclarativeService:PostDeclarativeService) { }

  posts$=this.postsDeclarativeService.posts$

  onSelectPost(post:Post) {
    this.postsDeclarativeService.setPostId(post.id)
  }

}

import { Component, OnInit } from '@angular/core';
import { PostDeclarativeService } from '../../services/post.declarative.service';

@Component({
  selector: 'app-posts-declarative',
  templateUrl: './posts-declarative.component.html',
  styleUrls: ['./posts-declarative.component.css']
})
export class PostsDeclarativeComponent implements OnInit {

  posts$=this.postsDeclarativeService.postsWithStudents$
  
  constructor(private postsDeclarativeService:PostDeclarativeService) { }

  ngOnInit(): void {
  }

}

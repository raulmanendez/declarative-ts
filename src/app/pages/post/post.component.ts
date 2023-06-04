import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostDeclarativeService } from 'src/app/services/post.declarative.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostComponent {

  constructor(private postsDeclarativeService:PostDeclarativeService) { }

  post$=this.postsDeclarativeService.post$


}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostDeclarativeService } from '../../services/post.declarative.service';
import { StudentDeclarativeService } from 'src/app/services/student.declarative';
import { BehaviorSubject, combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'app-posts-declarative',
  templateUrl: './posts-declarative.component.html',
  styleUrls: ['./posts-declarative.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostsDeclarativeComponent {

  
  constructor(private postsDeclarativeService:PostDeclarativeService,
    private studentDeclarativeService:StudentDeclarativeService) { }
    
  studentSubject$=new BehaviorSubject('ALL')
  studentObservable$=this.studentSubject$.asObservable();

  posts$=this.postsDeclarativeService.postsWithStudents$
  students$=this.studentDeclarativeService.students$;

  postsFiltered$=combineLatest([this.posts$,this.studentObservable$])
  .pipe(
    map(([posts,studentId]) => {
      return posts.filter(post => 
        studentId=='ALL' ? true :
        post.student==studentId)
    })
  )

  onStudentChange(event:Event) {
    let studentId=(event.target as HTMLSelectElement).value
    this.studentSubject$.next(studentId)
  }

}

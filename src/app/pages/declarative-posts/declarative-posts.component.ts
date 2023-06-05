import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { PostDeclarativeService } from 'src/app/services/post.declarative.service';
import { StudentDeclarativeService } from 'src/app/services/student.declarative';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarativePostsComponent implements OnInit {

  selectedCategoryId = '';
  posts$ = this.postService.allPosts$;
  students$ = this.studentService.students$;

  selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();

  filteredPosts$ = combineLatest([
    this.posts$,
    this.selectedCategoryAction$,
  ]).pipe(
    tap((data) => {
      this.loaderService.stopLoading();
    }),
    map(([posts, selectedStudent]) => {
      return posts.filter((post) =>
      selectedStudent ? post.student === selectedStudent : true
      );
    })
  );

  constructor(
    private postService: PostDeclarativeService,
    private studentService: StudentDeclarativeService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.startLoading();
  }
  onCategoryChange(event: Event) {
    let selectedCategoryId = (event.target as HTMLSelectElement).value;
    this.selectedCategorySubject.next(selectedCategoryId);
  }

}

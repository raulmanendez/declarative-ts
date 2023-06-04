import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/post.model'
import { Subject, catchError, combineLatest, delay, filter, map, share, shareReplay, tap } from 'rxjs';
import { StudentDeclarativeService } from './student.declarative';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class PostDeclarativeService {

  constructor(
    private http: HttpClient,
    private studentDeclarativeService: StudentDeclarativeService) { }

  private subject = new Subject<string>()
  private selectedPostIdObs$ = this.subject.asObservable()

  setPostId(postId: string) {
    this.subject.next(postId);
  }

  posts$ = this.http.get<{ [id: string]: Post }>('https://ng-store-a4630-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map(response => {

        let posts: Post[] = []
        for (let id in response) {
          posts.push({ ...response[id], id })
        }
        return posts;
      }), catchError((error) => {
        throw 'unknown error occured....'
      }),
      shareReplay(1))

  post$ = combineLatest([this.posts$, this.selectedPostIdObs$])
    .pipe(
      map(([posts, selectedPostId]) => {
        return posts.find(post => post.id == selectedPostId)
      }),
      shareReplay(1)
    )

  postsWithStudents$ = combineLatest([this.posts$, this.studentDeclarativeService.students$])
    .pipe(
      map(([posts, students]) => {
        return posts.map((post) => {
          return {
            ...post,
            studentName: students.find(stud => stud.id == post.student)?.name
          } as Post
        })
      })
    )
}

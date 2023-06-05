import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDAction, Post } from '../model/post.model'
import { Observable, Subject, catchError, combineLatest, concatMap, delay, filter, map, merge, scan, share, shareReplay, tap, throwError } from 'rxjs';
import { StudentDeclarativeService } from './student.declarative';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PostDeclarativeService {

  constructor(
    private http: HttpClient,
    private notificationService:NotificationService,
    private studentDeclarativeService: StudentDeclarativeService) { }

  private subject = new Subject<string>()
  private selectedPostIdObs$ = this.subject.asObservable()

  setPostId(postId: string) {
    this.subject.next(postId);
  }

  private postCRUDSubject = new Subject<CRUDAction<Post>>();
  postCRUDAction$ = this.postCRUDSubject.asObservable();

  private postCRUDCompleteSubject = new Subject<boolean>();
  postCRUDCompleteAction$ = this.postCRUDCompleteSubject.asObservable();


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

    allPosts$ = merge(
      this.postsWithStudents$,
      this.postCRUDAction$.pipe(
        concatMap((postAction) =>
          this.savePosts(postAction).pipe(
            map((post) => ({ ...postAction, data: post }))
          )
        )
      )
    ).pipe(
      scan((posts, value) => {
        return this.modifyPosts(posts, value);
      }, [] as Post[]),
      shareReplay(1),
      catchError(this.handleError)
    );

    savePosts(postAction: CRUDAction<Post>) {
      let postDetails$!: Observable<Post>;
  
      if (postAction.action === 'add') {
        postDetails$ = this.addPostToServer(postAction.data).pipe(
          tap((post) => {
            this.notificationService.setSuccessMessage('Post Added Successfully');
            this.postCRUDCompleteSubject.next(true);
          }),
          catchError(this.handleError)
        );
      }
  
      if (postAction.action === 'update') {
        postDetails$ = this.updatePostToServer(postAction.data).pipe(
          tap((post) => {
            this.notificationService.setSuccessMessage(
              'Post Updated Successfully'
            );
            this.postCRUDCompleteSubject.next(true);
          }),
          catchError(this.handleError)
        );
      }
  
      if (postAction.action === 'delete') {
        return this.deletePostToServer(postAction.data).pipe(
          tap((post) => {
            this.notificationService.setSuccessMessage(
              'Post Deleted Successfully'
            );
            this.postCRUDCompleteSubject.next(true);
          }),
          map((post) => postAction.data),
          catchError(this.handleError)
        );
      }
      
      return postDetails$.pipe(
        concatMap((post) =>
          this.studentDeclarativeService.students$.pipe(
            map((students) => {
              return {
                ...post,
                studentName: students.find(
                  (student) => student.id === post.student
                )?.name,
              };
            })
          )
        )
      );
    }

    modifyPosts(posts: Post[], value: Post[] | CRUDAction<Post>) {
      if (!(value instanceof Array)) {
        if (value.action === 'add') {
          return [...posts, value.data];
        }
        if (value.action === 'update') {
          return posts.map((post) =>
            post.id === value.data.id ? value.data : post
          );
        }
  
        if (value.action === 'delete') {
          return posts.filter((post) => post.id !== value.data.id);
        }
      } else {
        return value;
      }
  
      return posts;
    }

    addPost(post: Post) {
      this.postCRUDSubject.next({ action: 'add', data: post });
    }
  
    updatePost(post: Post) {
      this.postCRUDSubject.next({ action: 'update', data: post });
    }
  
    deletePost(post: Post) {
      this.postCRUDSubject.next({ action: 'delete', data: post });
    }

    deletePostToServer(post: Post) {
      return this.http.delete(
        `https://ng-store-a4630-default-rtdb.firebaseio.com/posts/${post.id}.json`
      );
    }
  
    updatePostToServer(post: Post) {
      return this.http.patch<Post>(
        `https://ng-store-a4630-default-rtdb.firebaseio.com/posts/${post.id}.json`,
        post
      );
    }
  
    addPostToServer(post: Post) {
      return this.http
        .post<{ name: string }>(
          `https://ng-store-a4630-default-rtdb.firebaseio.com/posts.json`,
          post
        )
        .pipe(
          map((id) => {
            return {
              ...post,
              id: id.name,
            };
          })
        );
    }

    handleError(error: Error) {
      return throwError(() => {
        return 'unknown error occurred. Please try again';
      });
    }
}

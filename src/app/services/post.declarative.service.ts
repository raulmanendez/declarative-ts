import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/post.model'
import { combineLatest, map } from 'rxjs';
import { StudentDeclarativeService } from './student.declarative';

@Injectable({
  providedIn: 'root'
})
export class PostDeclarativeService {

  constructor(
    private http:HttpClient,
    private studentDeclarativeService:StudentDeclarativeService) { }

    posts$=this.http.get<{ [id:string] : Post }>('https://ng-store-a4630-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(response => {

      let posts:Post[]= []
      for(let id in response) {
        posts.push({ ...response[id],id})
      }
      return posts;
    }))

    postsWithStudents$ = combineLatest([this.posts$,this.studentDeclarativeService.students$])
          .pipe(
            map(([posts,students]) =>{
              return posts.map((post) => {
                return {
                  ...post,
                  studentName:students.find(stud => stud.id==post.student)?.name
                } as Post
              })
            })
          )
  }

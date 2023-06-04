import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/post.model'
import { map, mergeMap, share, shareReplay } from 'rxjs';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http:HttpClient,
    private studentService:StudentService) { }

  getPosts() {
    return this.http.get<{ [id:string] : Post }>('https://ng-store-a4630-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(response => {

      let posts:Post[]= []
      for(let id in response) {
        posts.push({ ...response[id],id})
      }
      return posts;
    }),
    shareReplay(1))
  }

  getPostsAlongStudents() {
    return this.getPosts()
    .pipe(mergeMap(posts => {
        return this.studentService.getStudents().pipe(
          map(students=> {
            return posts.map(post => {
              return {
                ...post,
                studentName:students.find(student => student.id==post.student)?.name
              }
            })
          })
        )
    }))
  }
}

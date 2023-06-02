import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  getStudents() {
    return this.http.get<{ [id:string] : Student }>('https://ng-store-a4630-default-rtdb.firebaseio.com/student.json')
    .pipe(map(response => {

      let students:Student[]= []
      for(let id in response) {
        students.push({ ...response[id],id})
      }
      return students;
    }))
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EditPoint} from '../model/edit-point';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(teacherId: number): Observable<any> {
    return this.httpClient.get<any[]>('http://localhost:8080/pointManagement/' + teacherId);
  }

  editPoint(id: number, one: number, two: number) {
    const obj: EditPoint = {
      id,
      semesterOne: one,
      semesterTwo: two
    };
    return this.httpClient.put('http://localhost:8080/pointManagement/editPoint/', obj);
  }

  searchStudent(teacherId: number, studentName: String): Observable<any> {
    alert("zz")
    return this.httpClient.get<any[]>('http://localhost:8080/pointManagement/search?teacherId=' + teacherId + '&studentName_like=' + studentName);
  }

  searchTeacherId(teacherId: number): Observable<any> {
    alert("ok")
    return this.httpClient.get<any>('http://localhost:8080/pointManagement/search?teacherId=' + teacherId);
  }
}

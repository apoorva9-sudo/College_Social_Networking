import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  StudentCourse,
  StudentMaterial
} from '../models/student.models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/student';

  getCourses(): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(
      `${this.apiUrl}/courses`
    );
  }

  getCourseMaterials(courseId: number): Observable<StudentMaterial[]> {
    return this.http.get<StudentMaterial[]>(
      `${this.apiUrl}/courses/${courseId}/materials`
    );
  }
}
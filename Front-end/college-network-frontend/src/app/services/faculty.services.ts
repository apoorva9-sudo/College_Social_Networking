import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  FacultyCourse,
  FacultyMaterial,
  FacultyStudent
} from '../models/faculty.models';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080/api/faculty';

  // -------------------------
  // COURSE
  // -------------------------

  getAssignedCourse(): Observable<FacultyCourse> {
    return this.http.get<FacultyCourse>(
      `${this.baseUrl}/course`
    );
  }

  // -------------------------
  // MATERIALS
  // -------------------------

  getMyMaterials(): Observable<FacultyMaterial[]> {
    return this.http.get<FacultyMaterial[]>(
      `${this.baseUrl}/materials`
    );
  }

  getCourseMaterials(): Observable<FacultyMaterial[]> {
    return this.http.get<FacultyMaterial[]>(
      `${this.baseUrl}/course/materials`
    );
  }

  uploadMaterial(
    title: string,
    description: string,
    visibility: string,
    file: File
  ): Observable<FacultyMaterial> {

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('visibility', visibility);
    formData.append('file', file);

    return this.http.post<FacultyMaterial>(
      `${this.baseUrl}/materials`,
      formData
    );
  }

  deleteMaterial(
    materialId: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/materials/${materialId}`
    );
  }

  // -------------------------
  // STUDENTS
  // -------------------------

  getStudents(): Observable<FacultyStudent[]> {
    return this.http.get<FacultyStudent[]>(
      `${this.baseUrl}/students`
    );
  }
}
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { FacultyService } from '../../services/faculty.services';
import {
  FacultyCourse,
  FacultyMaterial,
  FacultyStudent
} from '../../models/faculty.models';

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './faculty-dashboard.component.html',
  styleUrl: './faculty-dashboard.component.css'
})
export class FacultyDashboardComponent implements OnInit {

  private facultyService = inject(FacultyService);

  course: FacultyCourse | null = null;
  materials: FacultyMaterial[] = [];
  students: FacultyStudent[] = [];

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadDashboard();
  }

  // loadDashboard(): void {

  //   this.loading = true;
  //   this.errorMessage = '';

  //   this.facultyService.getAssignedCourse()
  //     .subscribe({
  //       next: course => {
  //         this.course = course;
  //         this.loadAdditionalData();
  //       },
  //       error: error => {
  //         this.loading = false;
  //         this.handleError(error);
  //       }
  //     });
  // }


loadDashboard(): void {
  this.loading = true;
  this.errorMessage = '';

  forkJoin({
    course: this.facultyService.getAssignedCourse(),
    materials: this.facultyService.getMyMaterials(),
    students: this.facultyService.getStudents()
  }).subscribe({
    next: (data) => {

      console.log('FACULTY DASHBOARD DATA:', data);

      this.course = data.course;
      this.materials = data.materials;
      this.students = data.students;

      // VERY IMPORTANT
      this.loading = false;

      console.log('LOADING:', this.loading);
      console.log('COURSE:', this.course);
      console.log('MATERIALS:', this.materials);
      console.log('STUDENTS:', this.students);
    },

    error: (error) => {

      console.error('FACULTY DASHBOARD ERROR:', error);

      this.loading = false;

      this.handleError(error);
    }
  });
}

  get recentMaterials(): FacultyMaterial[] {
    return this.materials.slice(0, 4);
  }

  handleError(error: any): void {

    if (error.status === 401) {
      this.errorMessage =
        'Your login session has expired. Please sign in again.';
    }
    else if (error.status === 403) {
      this.errorMessage =
        'You do not have permission to access the faculty portal.';
    }
    else if (error.status === 404) {
      this.errorMessage =
        'Your assigned course could not be found.';
    }
    else {
      this.errorMessage =
        'Unable to load the faculty dashboard.';
    }
  }
}
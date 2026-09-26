import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyService } from '../../services/faculty.services';
import {
  FacultyCourse,
  FacultyStudent
} from '../../models/faculty.models';

@Component({
  selector: 'app-faculty-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-students.component.html',
  styleUrl: './faculty-students.component.css'
})
export class FacultyStudentsComponent implements OnInit {

  private facultyService = inject(FacultyService);

  course: FacultyCourse | null = null;
  students: FacultyStudent[] = [];

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {

    this.loading = true;

    this.facultyService.getAssignedCourse()
      .subscribe({
        next: course => {

          this.course = course;

          this.facultyService.getStudents()
            .subscribe({
              next: students => {
                this.students = students;
                this.loading = false;
              },

              error: error => {
                this.loading = false;
                this.handleError(error);
              }
            });
        },

        error: error => {
          this.loading = false;
          this.handleError(error);
        }
      });
  }

  handleError(error: any): void {

    if (error.status === 401) {
      this.errorMessage =
        'Your login session has expired.';
    }
    else if (error.status === 403) {
      this.errorMessage =
        'You do not have faculty access.';
    }
    else if (error.status === 404) {
      this.errorMessage =
        'Assigned course not found.';
    }
    else {
      this.errorMessage =
        'Unable to load students.';
    }
  }
}
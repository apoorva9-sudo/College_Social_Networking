import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyService } from '../../services/faculty.services';
import { FacultyCourse } from '../../models/faculty.models';

@Component({
  selector: 'app-faculty-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-course.component.html',
  styleUrl: './faculty-course.component.css'
})
export class FacultyCourseComponent implements OnInit {

  private facultyService = inject(FacultyService);

  course: FacultyCourse | null = null;

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.facultyService.getAssignedCourse()
      .subscribe({
        next: course => {
          this.course = course;
          this.loading = false;
        },

        error: error => {
          this.loading = false;

          if (error.status === 401) {
            this.errorMessage =
              'Your login session has expired.';
          } else if (error.status === 403) {
            this.errorMessage =
              'You do not have permission to access this page.';
          } else if (error.status === 404) {
            this.errorMessage =
              'No assigned course was found.';
          } else {
            this.errorMessage =
              'Unable to load your course.';
          }
        }
      });
  }
}
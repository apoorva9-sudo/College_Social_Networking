import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { PanelComponent } from '../shared/panel.component';
import { PillComponent } from '../shared/pill.component';

import { StudentService } from '../services/student.services';
import {
  StudentCourse,
  StudentMaterial
} from '../models/student.models';

@Component({
  selector: 'page-materials',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    PanelComponent,
    PillComponent
  ],
  template: `
    <div class="row g-4">

      <!-- COURSES -->
      <div class="col-lg-3">

        <quad-panel
          title="Courses"
          [meta]="courses.length.toString().padStart(2, '0')"
          [tint]="2">

          <div *ngIf="loadingCourses">
            Loading courses...
          </div>

          <ul
            *ngIf="!loadingCourses"
            class="list-unstyled m-0 d-flex flex-column gap-2">

            <li *ngFor="let c of courses; let i = index">

              <button
                class="btn-quad w-100 text-start"
                [class.btn-quad-primary]="c.courseId === selectedCourseId"
                (click)="selectCourse(c)">

                <span class="font-mono small me-2">
                  {{ c.courseCode }}
                </span>

                {{ c.courseName }}

              </button>

            </li>

          </ul>

          <div
            *ngIf="!loadingCourses && courses.length === 0"
            class="small text-muted-paper">

            No courses enrolled.

          </div>

        </quad-panel>

      </div>


      <!-- MATERIALS -->
      <div class="col-lg-9">

        <quad-panel
          [title]="selectedCourse
            ? selectedCourse.courseCode + ' · Materials'
            : 'Course Materials'"
          [meta]="materials.length + ' documents'"
          [tint]="1">

          <!-- Loading -->
          <div *ngIf="loadingMaterials">
            Loading materials...
          </div>


          <!-- Materials -->
          <div
            class="row g-3"
            *ngIf="!loadingMaterials && materials.length > 0">

            <div
              class="col-md-6"
              *ngFor="let m of materials">

              <div
                class="border-rule p-3 bg-paper d-flex flex-column h-100">

                <div class="d-flex justify-content-between">

                  <span class="label-mono">
                    {{ getMaterialType(m.fileType) }}
                  </span>

                  <quad-pill [tint]="1">
                    {{ formatDate(m.createdAt) }}
                  </quad-pill>

                </div>

                <div class="font-display fs-5 mt-2">
                  {{ m.title }}
                </div>

                <div
                  class="small text-muted-paper mt-1">

                  {{ m.uploadedByName || 'Faculty' }}

                </div>

                <div
                  class="small text-muted-paper mt-1"
                  *ngIf="m.description">

                  {{ m.description }}

                </div>

                <div class="mt-3 d-flex gap-2">

                  <a
                    class="btn-quad btn-quad-primary"
                    [href]="getFileUrl(m.fileUrl)"
                    target="_blank">

                    Open

                  </a>

                  <a
                    class="btn-quad"
                    [href]="getFileUrl(m.fileUrl)"
                    download>

                    Download

                  </a>

                </div>

              </div>

            </div>

          </div>


          <!-- Empty -->
          <div
            *ngIf="!loadingMaterials && materials.length === 0"
            class="small text-muted-paper">

            No materials available for this course.

          </div>

        </quad-panel>

      </div>

    </div>
  `
})
export class MaterialsComponent implements OnInit {

  private studentService = inject(StudentService);

  courses: StudentCourse[] = [];

  materials: StudentMaterial[] = [];

  selectedCourse: StudentCourse | null = null;

  selectedCourseId: number | null = null;

  loadingCourses = true;

  loadingMaterials = false;


  ngOnInit(): void {

    this.loadCourses();

  }


  loadCourses(): void {

    this.loadingCourses = true;

    this.studentService.getCourses().subscribe({

      next: (courses) => {

        this.courses = courses;

        this.loadingCourses = false;

        // Automatically select first course
        if (courses.length > 0) {
          this.selectCourse(courses[0]);
        }

      },

      error: (error) => {

        console.error(
          'Failed to load student courses:',
          error
        );

        this.loadingCourses = false;

      }

    });

  }


  selectCourse(course: StudentCourse): void {

    this.selectedCourse = course;

    this.selectedCourseId = course.courseId;

    this.loadMaterials(course.courseId);

  }


  loadMaterials(courseId: number): void {

    this.loadingMaterials = true;

    this.materials = [];

    this.studentService
      .getCourseMaterials(courseId)
      .subscribe({

        next: (materials) => {

          this.materials = materials;

          this.loadingMaterials = false;

        },

        error: (error) => {

          console.error(
            'Failed to load course materials:',
            error
          );

          this.loadingMaterials = false;

        }

      });

  }


  getMaterialType(fileType?: string): string {

    if (!fileType) {
      return 'FILE';
    }

    if (fileType.includes('pdf')) {
      return 'PDF';
    }

    if (fileType.includes('presentation')) {
      return 'SLIDES';
    }

    if (fileType.includes('word')) {
      return 'DOC';
    }

    if (fileType.includes('image')) {
      return 'IMAGE';
    }

    return 'FILE';

  }


  formatDate(date?: string): string {

    if (!date) {
      return '';

    }

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short'
      }
    );

  }


  getFileUrl(fileUrl: string): string {

    if (fileUrl.startsWith('http')) {
      return fileUrl;
    }

    return `http://localhost:8080${fileUrl}`;

  }

}
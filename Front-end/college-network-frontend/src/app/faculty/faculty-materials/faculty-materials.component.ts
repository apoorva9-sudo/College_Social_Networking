import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FacultyService } from '../../services/faculty.services';
import {
  FacultyCourse,
  FacultyMaterial
} from '../../models/faculty.models';

@Component({
  selector: 'app-faculty-materials',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './faculty-materials.component.html',
  styleUrl: './faculty-materials.component.css'
})
export class FacultyMaterialsComponent implements OnInit {

  private facultyService = inject(FacultyService);

  course: FacultyCourse | null = null;

  materials: FacultyMaterial[] = [];

  title = '';
  description = '';
  visibility = 'CLASS';

  selectedFile: File | null = null;

  loading = true;
  uploading = false;

  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.loading = true;
    this.errorMessage = '';

    this.facultyService.getAssignedCourse()
      .subscribe({
        next: course => {
          this.course = course;

          this.facultyService.getMyMaterials()
            .subscribe({
              next: materials => {
                this.materials = materials;
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

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload(): void {

    if (!this.title.trim()) {
      this.errorMessage = 'Title is required.';
      return;
    }

    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file.';
      return;
    }

    this.uploading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.facultyService.uploadMaterial(
      this.title,
      this.description,
      this.visibility,
      this.selectedFile
    )
    .subscribe({
      next: material => {

        this.materials.unshift(material);

        this.title = '';
        this.description = '';
        this.visibility = 'CLASS';
        this.selectedFile = null;

        this.uploading = false;

        this.successMessage =
          'Material uploaded successfully.';
      },

      error: error => {
        this.uploading = false;
        this.handleError(error);
      }
    });
  }

  deleteMaterial(material: FacultyMaterial): void {

    const confirmed = window.confirm(
      `Delete "${material.title}"?`
    );

    if (!confirmed) {
      return;
    }

    this.facultyService
      .deleteMaterial(material.materialId)
      .subscribe({
        next: () => {

          this.materials =
            this.materials.filter(
              item =>
                item.materialId !== material.materialId
            );

          this.successMessage =
            'Material deleted successfully.';
        },

        error: error => {
          this.handleError(error);
        }
      });
  }

  handleError(error: any): void {

    if (error.status === 401) {
      this.errorMessage =
        'Your login session has expired. Please sign in again.';
    }
    else if (error.status === 403) {
      this.errorMessage =
        'You do not have faculty permission for this action.';
    }
    else if (error.status === 404) {
      this.errorMessage =
        'The requested material was not found or is not owned by you.';
    }
    else {
      this.errorMessage =
        'Something went wrong. Please try again.';
    }
  }
}
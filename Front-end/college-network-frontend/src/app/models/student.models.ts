export interface StudentCourse {
  courseId: number;
  courseCode: string;
  courseName: string;
  description?: string;
}

export interface StudentMaterial {
  materialId: number;
  title: string;
  description?: string;
  fileUrl: string;
  fileType?: string;
  visibility: string;
  uploadedById?: number;
  uploadedByName?: string;
  courseId?: number;
  courseCode?: string;
  courseName?: string;
  createdAt?: string;
}
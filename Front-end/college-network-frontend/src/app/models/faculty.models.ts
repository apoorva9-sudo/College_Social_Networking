export interface FacultyCourse {
  courseId: number;
  courseCode: string;
  courseName: string;
  description: string;
  facultyId: number;
  facultyName: string;
}

export interface FacultyMaterial {
  materialId: number;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  visibility: 'PUBLIC' | 'PRIVATE' | 'CLASS';
  uploadedById: number;
  uploadedByName: string;
  createdAt: string;

  courseId?: number;
  courseCode?: string;
  courseName?: string;
}

export interface FacultyStudent {
  studentId: number;
  studentName: string;
  email: string;
}
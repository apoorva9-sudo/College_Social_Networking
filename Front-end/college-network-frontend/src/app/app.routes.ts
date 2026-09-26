import { Routes } from '@angular/router';
import { AppShellComponent } from './shell/app-shell.component';
import { authGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { FacultyShellComponent } from './faculty/faculty-shell/faculty-shell.component';
import { FacultyDashboardComponent }from './faculty/faculty-dashboard/faculty-dashboard.component';
export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'materials',
        loadComponent: () =>
          import('./pages/materials.component')
            .then(m => m.MaterialsComponent)
      },

      // other student routes...
    ]
  },

{
  path: 'faculty',
  component: FacultyShellComponent,
  canActivate: [authGuard],
  children: [

    {
      path: 'dashboard',
      component: FacultyDashboardComponent
    },

    {
      path: 'course',
      loadComponent: () =>
        import('./faculty/faculty-course/faculty-course.component')
          .then(m => m.FacultyCourseComponent)
    },

    {
      path: 'materials',
      loadComponent: () =>
        import('./faculty/faculty-materials/faculty-materials.component')
          .then(m => m.FacultyMaterialsComponent)
    },

    {
      path: 'students',
      loadComponent: () =>
        import('./faculty/faculty-students/faculty-students.component')
          .then(m => m.FacultyStudentsComponent)
    }
  ]
},
];
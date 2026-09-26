import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-faculty-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './faculty-shell.component.html',
  styleUrl: './faculty-shell.component.css'
})
export class FacultyShellComponent {

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();

    window.location.href = '/login';
  }
}
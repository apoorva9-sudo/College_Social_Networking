import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  loading = false;
  successMessage = '';
  errorMessage = '';
  popupMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      phone: ['', [
        Validators.required,
        Validators.pattern(/^[789]\d{9}$/)
      ]],

      role: ['', Validators.required]
    });
  }

  register(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.http.post(
      'http://localhost:8080/api/auth/register',
      this.registerForm.value,
      {
        responseType: 'text'
      }
    ).subscribe({

      next: (response) => {

        this.loading = false;

        this.successMessage = response;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },

      error: (error) => {

  this.loading = false;

  console.error('REGISTER ERROR:', error);

  if (error.status === 409) {

    this.popupMessage =
      'User already exists. Please use a different email.';

    // Clear only the email field
    this.registerForm.patchValue({
      email: ''
    });

    // Focus email field after popup closes
    setTimeout(() => {
      document.getElementById('email')?.focus();
    }, 100);

  }

  else if (error.status === 400) {

    this.popupMessage =
      'Please check your entered details.';

  }

  else {

    this.popupMessage =
      'Registration failed. Please try again.';

  }
}
    });
  }
  closePopup(): void {
  this.popupMessage = '';
}
}
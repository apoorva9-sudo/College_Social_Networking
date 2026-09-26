import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
  <div class="login-page">

    <div class="login-card">

      <!-- Logo Header -->
      <div class="logo">
        <div class="logo-mark">
          <span></span><span></span>
          <span></span><span></span>
        </div>
        <div class="logo-text">
          <span class="brand-name">Quad</span>
          <span class="brand-sub">COLLEGE / NETWORK</span>
        </div>
      </div>

      <!-- Main Heading -->
      <div class="card-header">
        <h1>Welcome back</h1>
        <p class="subtitle">Log in to access your campus dashboard</p>
      </div>

      <!-- Login Form -->
      <form [formGroup]="loginForm" (ngSubmit)="login()">

        <!-- Email -->
        <div class="form-group">
          <label for="email">STUDENT / FACULTY EMAIL</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="e.g. name@university.edu"
          />

          <div
            class="error"
            *ngIf="
              loginForm.get('email')?.touched &&
              loginForm.get('email')?.invalid
            "
          >
            <span *ngIf="loginForm.get('email')?.errors?.['required']">
              ■ Email address is required
            </span>
            <span *ngIf="loginForm.get('email')?.errors?.['email']">
              ■ Enter a valid email address
            </span>
          </div>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            placeholder="••••••••••••"
          />

          <div
            class="error"
            *ngIf="
              loginForm.get('password')?.touched &&
              loginForm.get('password')?.invalid
            "
          >
            <span *ngIf="loginForm.get('password')?.errors?.['required']">
              ■ Password is required
            </span>
            <span *ngIf="loginForm.get('password')?.errors?.['minlength']">
              ■ Password must be at least 6 characters
            </span>
          </div>
        </div>

        <!-- Backend error -->
        <div class="server-error" *ngIf="errorMessage">
          ■ {{ errorMessage }}
        </div>

        <!-- Login button -->
        <button
          type="submit"
          [disabled]="loginForm.invalid || loading"
        >
          {{ loading ? 'AUTHENTICATING...' : 'SIGN IN TO QUAD →' }}
        </button>

      </form>

      <!-- Footer / Registration Link -->
      <div class="card-footer">
        <p class="register-text">
          DON'T HAVE AN ACCOUNT?
          <a routerLink="/register">CREATE ACCOUNT</a>
        </p>
      </div>

    </div>

    <!-- Page Footer Stamp -->
    <div class="page-footer">
      <span>QUAD · v0.4 · AUTH</span>
      <span>Spring Semester 2026</span>
    </div>

  </div>
`,

styles: [`
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

  :host {
    --bg-main: #f5eedc;
    --card-bg: #f3edd9;
    --border-color: #2c2b29;
    --text-primary: #1c1b18;
    --text-muted: #736e65;
    --accent-burgundy: #731e1e;
    --accent-burgundy-hover: #581616;
    --error-bg: #ebd1d1;
    --font-serif: 'Instrument Serif', Georgia, serif;
    --font-sans: 'Plus Jakarta Sans', -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  .login-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-main);
    padding: 24px;
    box-sizing: border-box;
    font-family: var(--font-sans);
    color: var(--text-primary);
    position: relative;
  }

  /* Login Card Container */
  .login-card {
    width: 100%;
    max-width: 440px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    padding: 36px;
    box-sizing: border-box;
    position: relative;
    box-shadow: 4px 4px 0px rgba(44, 43, 41, 0.08);
  }

  /* Logo Branding Header */
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(44, 43, 41, 0.15);
  }

  .logo-mark {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    width: 22px;
    height: 22px;
  }

  .logo-mark span {
    background-color: var(--accent-burgundy);
  }

  .logo-mark span:nth-child(2) { opacity: 0.8; }
  .logo-mark span:nth-child(3) { opacity: 0.6; }
  .logo-mark span:nth-child(4) { opacity: 0.4; }

  .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  .brand-name {
    font-family: var(--font-serif);
    font-size: 26px;
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  .brand-sub {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.15em;
    color: var(--text-muted);
    font-weight: 600;
  }

  /* Header Section */
  .card-header {
    margin-bottom: 28px;
  }

  h1 {
    font-family: var(--font-serif);
    font-size: 34px;
    font-weight: 400;
    margin: 0 0 6px 0;
    letter-spacing: -0.01em;
  }

  .subtitle {
    margin: 0;
    color: var(--text-muted);
    font-size: 14px;
  }

  /* Form Controls */
  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--border-color);
    background-color: transparent;
    box-sizing: border-box;
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--text-primary);
    border-radius: 0;
    transition: all 0.15s ease;
  }

  input::placeholder {
    color: #a39c8e;
  }

  input:focus {
    outline: none;
    border-color: var(--accent-burgundy);
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: inset 0 0 0 1px var(--accent-burgundy);
  }

  /* Validation & Error Messaging */
  .error {
    color: var(--accent-burgundy);
    font-family: var(--font-mono);
    font-size: 11px;
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .server-error {
    background: var(--error-bg);
    border: 1px solid var(--accent-burgundy);
    color: var(--accent-burgundy);
    padding: 10px 12px;
    font-family: var(--font-mono);
    font-size: 12px;
    margin-bottom: 20px;
  }

  /* Action Button */
  button {
    width: 100%;
    padding: 14px;
    border: 1px solid var(--border-color);
    background: var(--accent-burgundy);
    color: #fcfaf4;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    cursor: pointer;
    border-radius: 0;
    transition: background 0.15s ease, transform 0.1s ease;
    margin-top: 8px;
  }

  button:hover:not(:disabled) {
    background: var(--accent-burgundy-hover);
  }

  button:disabled {
    background: #c2bba8;
    border-color: #a8a08d;
    color: #7a7363;
    cursor: not-allowed;
  }

  /* Footer Section */
  .card-footer {
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px dashed rgba(44, 43, 41, 0.2);
    text-align: center;
  }

  .register-text {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-muted);
  }

  .register-text a {
    color: var(--accent-burgundy);
    font-weight: 600;
    text-decoration: underline;
    margin-left: 4px;
  }

  .register-text a:hover {
    color: var(--text-primary);
  }

  /* Page Footer Metadata */
  .page-footer {
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
    width: calc(100% - 48px);
    max-width: 440px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
  }
`]
})
export class LoginComponent {

  loginForm: FormGroup;

  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });
  }

 login(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.errorMessage = '';

  this.authService.login(this.loginForm.value).subscribe({
    next: () => {
  this.loading = false;

  this.authService.getMyProfile().subscribe({
    next: (profile) => {

      console.log('MY PROFILE:', profile);

      const role = profile.roles?.[0];

      console.log('USER ROLE:', role);

      if (role === 'FACULTY') {
        this.router.navigate(['/faculty/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },

    error: (error) => {
      console.error('PROFILE ERROR:', error);
      this.errorMessage = 'Unable to load user profile.';
    }
  });
},

    error: (error) => {
      this.loading = false;
      console.error('LOGIN ERROR:', error);

      this.errorMessage =
        'Invalid email or password. Please try again.';
    }
  });
}
}
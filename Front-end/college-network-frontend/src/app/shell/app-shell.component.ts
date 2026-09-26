import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { QuadMarkComponent } from '../shared/quad-mark.component';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

interface NavItem { 
  to: string; 
  label: string; 
  code: string;
   exact?: boolean; }

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, QuadMarkComponent],
  template: `
    <div class="app-shell">
      <aside>
        <div class="d-flex align-items-center gap-3 px-4 py-4 rule-b">
          <quad-mark></quad-mark>
          <div>
            <div class="font-display fs-4 lh-1">Quad</div>
            <div class="label-mono mt-1">College / Network</div>
          </div>
        </div>

        <nav class="flex-grow-1 py-3 nav-quad">
          <div class="label-mono px-4 py-2">Modules</div>
          <ul class="list-unstyled mb-0">
            <li *ngFor="let item of nav">
              <a [routerLink]="item.to"
                 routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: !!item.exact }">
                <span class="code">{{ item.code }}</span>
                <span>{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="rule-t p-4">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span class="label-mono">Signed in</span>
<button
  type="button"
  (click)="logout()"
  class="font-mono small text-muted-paper text-decoration-none"
  style="font-size:10px;letter-spacing:.08em;text-transform:uppercase;background:none;border:none;padding:0;"
>
  Sign out
</button>          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle d-grid place-items-center font-display"
                 style="width:36px;height:36px;background:var(--primary);color:var(--primary-foreground);display:grid;place-items:center;font-size:14px">AR</div>
            <div class="small lh-sm">
              <div class="fw-medium">Aanya Rao</div>
              <div class="text-muted-paper" style="font-size:12px">B.Tech · CSE · Y3</div>
            </div>
          </div>
        </div>
      </aside>

      <div class="main">
        <header class="topbar">
          <div class="d-flex align-items-center gap-4 px-4 py-2">
            <div class="ms-auto d-flex align-items-center gap-2">
              <div class="d-none d-md-flex align-items-center gap-2 px-3 py-1 border-rule bg-card-paper" style="width:18rem">
                <span class="font-mono small text-muted-paper">⌘K</span>
                <span class="text-muted-paper small">Search the quad…</span>
              </div>
              <button class="btn-quad"><span class="font-mono small">Term</span> · Spring '26</button>
              <a routerLink="/notifications" class="btn-quad position-relative text-decoration-none">
                Inbox
                <span class="position-absolute font-mono d-grid"
                      style="top:-6px;right:-6px;height:16px;min-width:16px;padding:0 4px;background:var(--primary);color:var(--primary-foreground);font-size:10px;display:grid;place-items:center">4</span>
              </a>
            </div>
          </div>
          <div class="px-4 pb-4 pt-1 d-flex align-items-end justify-content-between gap-3">
            <h1 class="font-display m-0" style="font-size:2.5rem;line-height:.95">{{ pageTitle }}</h1>
          </div>
        </header>

        <main class="flex-grow-1 px-4 py-4">
          <router-outlet (activate)="onActivate($event)"></router-outlet>
        </main>

        <footer class="rule-t px-4 py-3 d-flex align-items-center justify-content-between font-mono text-muted-paper" style="font-size:12px">
          <span>QUAD · v0.4 · MOCKUP</span>
          <span>Spring Semester 2026 · 14 weeks</span>
        </footer>
      </div>
    </div>
  `,
})
export class AppShellComponent {
  constructor(
  private router: Router,
  private authService: AuthService
) {}
  pageTitle = 'Dashboard';
  nav: NavItem[] = [
    { to: '/', label: 'Dashboard', code: '00', exact: true },
    { to: '/materials', label: 'Materials', code: '01' },
    { to: '/assignments', label: 'Assignments', code: '02' },
    { to: '/discussions', label: 'Discussions', code: '03' },
    { to: '/quizzes', label: 'Quizzes', code: '04' },
    { to: '/chat', label: 'Chat', code: '05' },
    { to: '/notifications', label: 'Notifications', code: '06' },
  ];

  onActivate(component: { pageTitle?: string }) {
    if (component && component.pageTitle) this.pageTitle = component.pageTitle;
  }
  logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}

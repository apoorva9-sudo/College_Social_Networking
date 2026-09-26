import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { PanelComponent } from '../shared/panel.component';
import { PillComponent } from '../shared/pill.component';

@Component({
  selector: 'page-quizzes',
  standalone: true,
  imports: [NgFor, NgClass, PanelComponent, PillComponent],
  template: `
    <div class="row g-4">
      <div class="col-lg-8">
        <quad-panel title="Q-04 · Process Synchronization" meta="Question 4 of 10" [tint]="1">
          <div class="d-flex justify-content-between mb-3">
            <quad-pill [tint]="3">Live · 18:42 left</quad-pill>
            <span class="label-mono">Single answer</span>
          </div>
          <div class="font-display fs-5">A binary semaphore differs from a mutex primarily because…</div>
          <div class="d-flex flex-column gap-2 mt-3">
            <button *ngFor="let opt of options; let i = index"
              class="btn-quad text-start"
              [ngClass]="{ 'btn-quad-primary': i===1 }">
              <span class="font-mono small me-2">{{ ['A','B','C','D'][i] }}</span>{{ opt }}
            </button>
          </div>
          <div class="d-flex justify-content-between mt-4">
            <button class="btn-quad">← Previous</button>
            <button class="btn-quad btn-quad-primary">Next →</button>
          </div>
        </quad-panel>
      </div>
      <div class="col-lg-4">
        <quad-panel title="Question Map" meta="10 total" [tint]="4">
          <div class="d-grid gap-2" style="grid-template-columns:repeat(5,1fr)">
            <button *ngFor="let s of statuses; let i = index"
              class="btn-quad"
              [ngClass]="{ 'btn-quad-primary': s==='current' }"
              [style.opacity]="s==='locked' ? 0.45 : 1">
              {{ i+1 }}
            </button>
          </div>
          <div class="rule-t mt-3 pt-3 small text-muted-paper">
            <div>● Answered · 03</div>
            <div>○ Skipped · 01</div>
            <div>· Current · 04</div>
          </div>
        </quad-panel>
      </div>
    </div>
  `,
})
export class QuizzesComponent {
  pageTitle = 'Quizzes';
  options = [
    'It can be acquired by any thread regardless of ownership.',
    'A mutex enforces ownership; only the locking thread may release it.',
    'Semaphores cannot be used for mutual exclusion at all.',
    'They are functionally identical in POSIX.',
  ];
  statuses = ['done','done','done','current','open','open','open','open','locked','locked'];
}

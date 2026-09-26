import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { PanelComponent } from '../shared/panel.component';
import { PillComponent } from '../shared/pill.component';

@Component({
  selector: 'page-discussions',
  standalone: true,
  imports: [NgFor, PanelComponent, PillComponent],
  template: `
    <div class="row g-4">
      <div class="col-lg-8">
        <quad-panel title="Recent Threads" meta="42 active" [tint]="2">
          <div *ngFor="let t of threads; let last = last"
               class="py-3" [class.rule-b]="!last">
            <div class="d-flex justify-content-between">
              <span class="label-mono">{{ t.course }}</span>
              <quad-pill [tint]="t.tint">{{ t.tag }}</quad-pill>
            </div>
            <div class="font-display fs-5 mt-1">{{ t.title }}</div>
            <div class="small text-muted-paper">{{ t.preview }}</div>
            <div class="d-flex gap-3 mt-2 small text-muted-paper font-mono">
              <span>{{ t.author }}</span>
              <span>·</span>
              <span>{{ t.replies }} replies</span>
              <span>·</span>
              <span>{{ t.when }}</span>
            </div>
          </div>
        </quad-panel>
      </div>
      <div class="col-lg-4">
        <quad-panel title="Top Contributors" meta="this week" [tint]="3">
          <div class="d-flex flex-column gap-3">
            <div *ngFor="let p of contributors" class="d-flex align-items-center gap-3">
              <div class="rounded-circle d-grid"
                   style="width:36px;height:36px;background:var(--secondary);display:grid;place-items:center;font-family:Fraunces,serif">
                {{ p.initials }}
              </div>
              <div class="flex-grow-1">
                <div class="font-display">{{ p.name }}</div>
                <div class="label-mono">{{ p.role }}</div>
              </div>
              <span class="font-mono small">{{ p.posts }}</span>
            </div>
          </div>
        </quad-panel>
      </div>
    </div>
  `,
})
export class DiscussionsComponent {
  pageTitle = 'Discussions';
  threads = [
    { course: 'CS301 · OS',   tag: 'Pinned', tint: 1 as 1, title: 'Why does my mutex deadlock at line 47?',
      preview: 'I traced the issue with strace, but two threads still wait on each other…',
      author: 'Mira K.', replies: 14, when: '2h ago' },
    { course: 'MA301 · LA',   tag: 'Open',   tint: 2 as 2, title: 'Intuition behind eigenvectors in 4D',
      preview: 'Looking for a geometric interpretation that doesn’t collapse the dimension…',
      author: 'Rohit V.', replies: 6, when: '5h ago' },
    { course: 'CS302 · DBMS', tag: 'Solved', tint: 3 as 3, title: '3NF vs BCNF on the assignment dataset',
      preview: 'TA confirmed that the partial dependency only matters when…',
      author: 'Ananya G.', replies: 22, when: '1d ago' },
  ];
  contributors = [
    { initials: 'MK', name: 'Mira K.',   role: 'CSE · Y3', posts: 18 },
    { initials: 'RV', name: 'Rohit V.',  role: 'ECE · Y3', posts: 14 },
    { initials: 'AG', name: 'Ananya G.', role: 'CSE · Y3', posts: 11 },
  ];
}

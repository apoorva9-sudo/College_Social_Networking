import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { QuadStatsComponent, QuadStat } from '../shared/quad-stats.component';
import { PanelComponent } from '../shared/panel.component';
import { PillComponent } from '../shared/pill.component';

@Component({
  selector: 'page-dashboard',
  standalone: true,
  imports: [NgFor, QuadStatsComponent, PanelComponent, PillComponent],
  template: `
    <quad-stats [items]="stats"></quad-stats>

    <div class="row g-4 mt-2">
      <div class="col-lg-8">
        <quad-panel title="Today's Quad" meta="Mon · Mar 16" [tint]="1">
          <div class="row g-3">
            <div class="col-6" *ngFor="let b of blocks">
              <div class="border-rule p-3 bg-paper h-100">
                <div class="label-mono">{{ b.time }}</div>
                <div class="font-display fs-5 mt-1">{{ b.title }}</div>
                <div class="small text-muted-paper">{{ b.where }}</div>
                <div class="mt-2"><quad-pill [tint]="b.tint">{{ b.tag }}</quad-pill></div>
              </div>
            </div>
          </div>
        </quad-panel>
      </div>
      <div class="col-lg-4">
        <quad-panel title="Course Load" meta="6 of 7 courses" [tint]="3">
          <div class="d-flex flex-column gap-3">
            <div *ngFor="let c of courses">
              <div class="d-flex justify-content-between mb-1">
                <span class="font-display">{{ c.name }}</span>
                <span class="font-mono small text-muted-paper">{{ c.pct }}%</span>
              </div>
              <div class="bar"><span [style.width.%]="c.pct"></span></div>
            </div>
          </div>
        </quad-panel>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  pageTitle = 'Dashboard';
  stats: QuadStat[] = [
    { label: 'Active Courses', value: '06', sub: 'Spring · 14 weeks', tint: 1 },
    { label: 'Pending Tasks',  value: '04', sub: '2 due this week',   tint: 2 },
    { label: 'Quiz Average',   value: '88', sub: 'across 12 attempts', tint: 3 },
    { label: 'Attendance',     value: '94%', sub: 'last 30 days',      tint: 4 },
  ];
  blocks = [
    { time: '09:00 — 10:30', title: 'Operating Systems', where: 'Lecture · Hall C', tag: 'In progress', tint: 1 as 1 },
    { time: '11:00 — 12:30', title: 'Linear Algebra',    where: 'Tutorial · Room 214', tag: 'Upcoming',  tint: 2 as 2 },
    { time: '14:00 — 15:30', title: 'DBMS Lab',          where: 'Lab Block 3',         tag: 'Submit by',  tint: 3 as 3 },
    { time: '16:00 — 17:00', title: 'Open Office Hours', where: 'Faculty Wing',        tag: 'Optional',  tint: 4 as 4 },
  ];
  courses = [
    { name: 'Operating Systems', pct: 72 },
    { name: 'Database Mgmt',     pct: 58 },
    { name: 'Linear Algebra',    pct: 81 },
    { name: 'Software Eng.',     pct: 44 },
  ];
}

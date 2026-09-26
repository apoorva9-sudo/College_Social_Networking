import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { PanelComponent } from '../shared/panel.component';
import { PillComponent } from '../shared/pill.component';

@Component({
  selector: 'page-assignments',
  standalone: true,
  imports: [NgFor, PanelComponent, PillComponent],
  template: `
    <quad-panel title="Open Submissions" meta="04 active" [tint]="1">
      <div class="d-flex flex-column">
        <div *ngFor="let a of assignments; let last = last"
             class="d-flex align-items-center gap-3 py-3"
             [class.rule-b]="!last">
          <div class="font-mono small text-muted-paper" style="width:64px">{{ a.code }}</div>
          <div class="flex-grow-1">
            <div class="font-display fs-5">{{ a.title }}</div>
            <div class="small text-muted-paper">{{ a.course }} · Due {{ a.due }}</div>
            <div class="bar mt-2" style="max-width:340px"><span [style.width.%]="a.pct"></span></div>
          </div>
          <quad-pill [tint]="a.tint">{{ a.status }}</quad-pill>
          <button class="btn-quad btn-quad-primary">Open</button>
        </div>
      </div>
    </quad-panel>
  `,
})
export class AssignmentsComponent {
  pageTitle = 'Assignments';
  assignments = [
    { code: 'A-12', title: 'Producer-Consumer in C', course: 'OS', due: 'Wed · 23:59', status: 'In progress', tint: 1 as 1, pct: 60 },
    { code: 'A-09', title: 'Normalization Practice', course: 'DBMS', due: 'Fri · 18:00', status: 'Not started', tint: 3 as 3, pct: 5 },
    { code: 'A-07', title: 'Eigenvalues Worksheet', course: 'Linear Algebra', due: 'Mon · 09:00', status: 'Submitted', tint: 2 as 2, pct: 100 },
    { code: 'A-04', title: 'SRS Document Draft',    course: 'SE', due: 'Sat · 23:59', status: 'In review',  tint: 4 as 4, pct: 80 },
  ];
}

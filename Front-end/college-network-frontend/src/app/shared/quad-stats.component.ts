import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
export interface QuadStat {
  label: string;
  value: string;
  sub?: string;
  tint: 1 | 2 | 3 | 4;
}

@Component({
  selector: 'quad-stats',
  standalone: true,
  imports: [NgFor,CommonModule],
  template: `
    <div class="quad-stats">
      <div class="stat" *ngFor="let it of items">
        <span class="accent" [class.tint-1]="it.tint===1" [class.tint-2]="it.tint===2" [class.tint-3]="it.tint===3" [class.tint-4]="it.tint===4"></span>
        <div class="label-mono">{{ it.label }}</div>
        <div class="stat-value">{{ it.value }}</div>
        <div class="stat-sub" *ngIf="it.sub">{{ it.sub }}</div>
      </div>
    </div>
  `,
})
export class QuadStatsComponent {
  @Input() items: QuadStat[] = [];
}

import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'quad-panel',
  standalone: true,
  imports: [NgIf],
  template: `
    <section class="panel">
      <header>
        <div class="d-flex align-items-center gap-2">
          <span *ngIf="tint" class="d-inline-block"
            [class.tint-1]="tint===1" [class.tint-2]="tint===2"
            [class.tint-3]="tint===3" [class.tint-4]="tint===4"
            style="width:10px;height:10px"></span>
          <h2>{{ title }}</h2>
        </div>
        <span class="label-mono" *ngIf="meta">{{ meta }}</span>
      </header>
      <div class="panel-body"><ng-content></ng-content></div>
    </section>
  `,
})
export class PanelComponent {
  @Input() title = '';
  @Input() meta?: string;
  @Input() tint?: 1 | 2 | 3 | 4;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'quad-pill',
  standalone: true,
  template: `
    <span class="pill" [class.tint-2-pill]="tint===2" [class.tint-3-pill]="tint===3" [class.tint-4-pill]="tint===4">
      <span class="dot"></span>
      <ng-content></ng-content>
    </span>
  `,
})
export class PillComponent {
  @Input() tint: 1 | 2 | 3 | 4 = 1;
}

import { Component } from '@angular/core';

@Component({
  selector: 'quad-mark',
  standalone: true,
  template: `
    <span class="quad-mark" [style.width.px]="size" [style.height.px]="size" aria-hidden="true">
      <span class="tint-1"></span>
      <span class="tint-2"></span>
      <span class="tint-4"></span>
      <span class="tint-3"></span>
    </span>
  `,
})
export class QuadMarkComponent {
  size = 22;
}

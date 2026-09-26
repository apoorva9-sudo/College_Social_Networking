import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { PanelComponent } from '../shared/panel.component';
import { PillComponent } from '../shared/pill.component';

@Component({
  selector: 'page-notifications',
  standalone: true,
  imports: [NgFor, PanelComponent, PillComponent],
  template: `
    <quad-panel title="Inbox" meta="04 unread" [tint]="1">
      <div *ngFor="let n of items; let last = last"
           class="d-flex gap-3 py-3" [class.rule-b]="!last">
        <span class="d-inline-block mt-2"
          [class.tint-1]="n.tint===1" [class.tint-2]="n.tint===2"
          [class.tint-3]="n.tint===3" [class.tint-4]="n.tint===4"
          style="width:8px;height:8px;flex-shrink:0"></span>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between">
            <span class="font-display fs-6">{{ n.title }}</span>
            <span class="label-mono">{{ n.when }}</span>
          </div>
          <div class="small text-muted-paper">{{ n.body }}</div>
          <div class="mt-2"><quad-pill [tint]="n.tint">{{ n.kind }}</quad-pill></div>
        </div>
      </div>
    </quad-panel>
  `,
})
export class NotificationsComponent {
  pageTitle = 'Notifications';
  items = [
    { kind: 'Assignment', tint: 1 as 1, title: 'OS · Producer-Consumer due in 26h',
      body: 'Submit your archive (.zip) on the Assignments tab.', when: '09:42' },
    { kind: 'Discussion', tint: 2 as 2, title: 'New reply in “3NF vs BCNF”',
      body: 'TA Nair marked your answer as accepted.', when: '08:11' },
    { kind: 'Quiz',       tint: 3 as 3, title: 'Q-04 unlocked',
      body: 'Process Synchronization · 10 questions · 25 minutes.', when: 'Yesterday' },
    { kind: 'System',     tint: 4 as 4, title: 'Term shifted to Spring ‘26',
      body: 'Your dashboard now reflects the new 14-week schedule.', when: 'Mon' },
  ];
}

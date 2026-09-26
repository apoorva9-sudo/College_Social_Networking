import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'page-chat',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
    <div class="border-rule bg-card-paper" style="display:grid;grid-template-columns:240px 1fr 260px;min-height:560px">
      <aside class="rule-r p-3">
        <div class="label-mono mb-2">Channels</div>
        <ul class="list-unstyled m-0 d-flex flex-column gap-1">
          <li *ngFor="let ch of channels; let i = index">
            <button class="btn-quad w-100 text-start"
                    [ngClass]="{ 'btn-quad-primary': i===0 }">
              <span class="font-mono small me-2">#</span>{{ ch }}
            </button>
          </li>
        </ul>
        <div class="label-mono mt-3 mb-2">Direct</div>
        <ul class="list-unstyled m-0 d-flex flex-column gap-1">
          <li *ngFor="let d of dms">
            <button class="btn-quad w-100 text-start">
              <span class="d-inline-block me-2 rounded-circle"
                    style="width:8px;height:8px;background:var(--quad-2)"></span>{{ d }}
            </button>
          </li>
        </ul>
      </aside>

      <section class="d-flex flex-column">
        <header class="rule-b p-3 d-flex align-items-center justify-content-between">
          <div>
            <div class="font-display fs-5">#cs301-os</div>
            <div class="label-mono">42 members</div>
          </div>
          <button class="btn-quad">Pin</button>
        </header>
        <div class="flex-grow-1 p-3 d-flex flex-column gap-3">
          <div *ngFor="let m of messages" class="d-flex gap-3">
            <div class="rounded-circle d-grid flex-shrink-0"
                 style="width:32px;height:32px;background:var(--secondary);display:grid;place-items:center;font-family:Fraunces,serif">
              {{ m.who[0] }}
            </div>
            <div>
              <div class="d-flex gap-2 align-items-baseline">
                <span class="font-display">{{ m.who }}</span>
                <span class="label-mono">{{ m.at }}</span>
              </div>
              <div>{{ m.text }}</div>
            </div>
          </div>
        </div>
        <footer class="rule-t p-3">
          <input class="quad-input" placeholder="Message #cs301-os" />
        </footer>
      </section>

      <aside class="rule-l p-3">
        <div class="label-mono mb-2">Pinned</div>
        <div class="border-rule p-2 bg-paper small mb-2">Lab 06 reschedule → Friday 14:00.</div>
        <div class="border-rule p-2 bg-paper small">Mid-sem syllabus is final, see materials.</div>
      </aside>
    </div>
  `,
})
export class ChatComponent {
  pageTitle = 'Chat';
  channels = ['cs301-os','cs302-dbms','ma301-la','cs304-se','open-elective'];
  dms = ['Dr. Iyer','TA Nair','Mira K.','Rohit V.'];
  messages = [
    { who: 'TA Nair',  at: '09:42', text: 'Quick reminder: lab submissions close at 23:59 IST.' },
    { who: 'Mira K.',  at: '09:48', text: 'Anyone else’s mutex deadlocking at the third producer?' },
    { who: 'Rohit V.', at: '09:51', text: 'Yeah — make sure you’re not nesting locks across condition vars.' },
    { who: 'Aanya R.', at: '09:55', text: 'Switched to a counting semaphore, fixed it.' },
  ];
}

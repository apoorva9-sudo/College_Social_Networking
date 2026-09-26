import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyShell } from './faculty-shell';

describe('FacultyShell', () => {
  let component: FacultyShell;
  let fixture: ComponentFixture<FacultyShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

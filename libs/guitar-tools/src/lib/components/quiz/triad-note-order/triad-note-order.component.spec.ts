import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriadNoteOrderComponent } from './triad-note-order.component';

describe('TriadNoteOrderComponent', () => {
  let component: TriadNoteOrderComponent;
  let fixture: ComponentFixture<TriadNoteOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriadNoteOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TriadNoteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

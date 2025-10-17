import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordQuizComponent } from './chord-quiz.component';

describe('ChordQuizComponent', () => {
  let component: ChordQuizComponent;
  let fixture: ComponentFixture<ChordQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordQuizComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeQuizComponent } from './mode-quiz.component';

describe('ModeQuizComponent', () => {
  let component: ModeQuizComponent;
  let fixture: ComponentFixture<ModeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeQuizComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

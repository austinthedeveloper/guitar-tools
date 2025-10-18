import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleQuizComponent } from './scale-quiz.component';

describe('ScaleQuizComponent', () => {
  let component: ScaleQuizComponent;
  let fixture: ComponentFixture<ScaleQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScaleQuizComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

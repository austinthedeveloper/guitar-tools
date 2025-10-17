import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeMajorQuizComponent } from './relative-major-quiz.component';

describe('RelativeMajorQuizComponent', () => {
  let component: RelativeMajorQuizComponent;
  let fixture: ComponentFixture<RelativeMajorQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelativeMajorQuizComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativeMajorQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeNameQuizComponent } from './mode-name-quiz.component';

describe('ModeNameQuizComponent', () => {
  let component: ModeNameQuizComponent;
  let fixture: ComponentFixture<ModeNameQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeNameQuizComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeNameQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

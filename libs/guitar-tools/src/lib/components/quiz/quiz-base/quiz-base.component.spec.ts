import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChordQuizBaseComponent } from './quiz-base.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ChordQuizBaseComponent', () => {
  let component: ChordQuizBaseComponent;
  let fixture: ComponentFixture<ChordQuizBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ChordQuizBaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordQuizBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct default values', () => {
    expect(component.form.value).toEqual({
      correct: 0,
      incorrect: 0,
      total: 0,
      answer: null,
      guess: null,
    });
  });

  it('should increment correct count and reset guess when answer is correct', () => {
    const guessValue = 'A';
    const answerValue = 'A';
    const correctCount = 1;
    const totalCount = 1;

    component.form.controls.guess.setValue(guessValue);
    component.form.controls.answer.setValue(answerValue);

    component.submitAnswer();

    expect(component.form.value.correct).toBe(correctCount);
    expect(component.form.value.total).toBe(totalCount);
    expect(component.form.value.guess).toBe(null);
  });

  it('should increment incorrect count and total count when answer is wrong', () => {
    const guessValue = 'A';
    const answerValue = 'B';
    const incorrectCount = 1;
    const totalCount = 1;

    component.form.controls.guess.setValue(guessValue);
    component.form.controls.answer.setValue(answerValue);

    component.submitAnswer();

    expect(component.form.value.incorrect).toBe(incorrectCount);
    expect(component.form.value.total).toBe(totalCount);
  });

  it('should reset the form to initial values', () => {
    component.form.patchValue({
      correct: 3,
      incorrect: 2,
      total: 5,
      answer: 'A',
      guess: 'B',
    });

    jest.spyOn(component.afterReset, 'emit');
    component.reset();

    expect(component.form.value).toEqual({
      correct: 0,
      incorrect: 0,
      total: 0,
      answer: null,
      guess: null,
    });
    expect(component.afterReset.emit).toHaveBeenCalledWith(
      component.form.value
    );
  });
});

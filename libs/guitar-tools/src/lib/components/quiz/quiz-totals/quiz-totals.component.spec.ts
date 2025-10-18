/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizTotalsComponent } from './quiz-totals.component';

describe('QuizTotalsComponent', () => {
  let component: QuizTotalsComponent;
  let fixture: ComponentFixture<QuizTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [QuizTotalsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

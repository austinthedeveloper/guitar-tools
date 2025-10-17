/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelativeMinorQuizComponent } from './relative-minor-quiz.component';

describe('RelativeMinorQuizComponent', () => {
  let component: RelativeMinorQuizComponent;
  let fixture: ComponentFixture<RelativeMinorQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RelativeMinorQuizComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativeMinorQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

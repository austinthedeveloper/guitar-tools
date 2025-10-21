/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FretboardQuizComponent } from './fretboard-quiz.component';

describe('FretboardQuizComponent', () => {
  let component: FretboardQuizComponent;
  let fixture: ComponentFixture<FretboardQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FretboardQuizComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FretboardQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeOrderingQuizComponent } from './mode-ordering-quiz.component';

describe('ModeOrderingQuizComponent', () => {
  let component: ModeOrderingQuizComponent;
  let fixture: ComponentFixture<ModeOrderingQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModeOrderingQuizComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeOrderingQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

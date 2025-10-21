/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTabComponent } from './chart-tab.component';

describe('ChartTabComponent', () => {
  let component: ChartTabComponent;
  let fixture: ComponentFixture<ChartTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartTabComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

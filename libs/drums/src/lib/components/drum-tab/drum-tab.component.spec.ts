/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrumTabComponent } from './drum-tab.component';

describe('DrumTabComponent', () => {
  let component: DrumTabComponent;
  let fixture: ComponentFixture<DrumTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrumTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

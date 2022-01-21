import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumConfigComponent } from './drum-config.component';

describe('DrumConfigComponent', () => {
  let component: DrumConfigComponent;
  let fixture: ComponentFixture<DrumConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrumConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

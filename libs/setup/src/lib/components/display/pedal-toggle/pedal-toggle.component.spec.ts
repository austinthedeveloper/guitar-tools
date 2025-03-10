import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedalToggleComponent } from './pedal-toggle.component';

describe('PedalToggleComponent', () => {
  let component: PedalToggleComponent;
  let fixture: ComponentFixture<PedalToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedalToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PedalToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

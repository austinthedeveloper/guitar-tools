import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KnobDisplayComponent } from './knob-display.component';

describe('KnobDisplayComponent', () => {
  let component: KnobDisplayComponent;
  let fixture: ComponentFixture<KnobDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KnobDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KnobDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

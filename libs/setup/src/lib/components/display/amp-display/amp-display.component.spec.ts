import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmpDisplayComponent } from './amp-display.component';

describe('AmpDisplayComponent', () => {
  let component: AmpDisplayComponent;
  let fixture: ComponentFixture<AmpDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmpDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AmpDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedalboardDisplayComponent } from './pedalboard-display.component';

describe('PedalboardDisplayComponent', () => {
  let component: PedalboardDisplayComponent;
  let fixture: ComponentFixture<PedalboardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedalboardDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PedalboardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

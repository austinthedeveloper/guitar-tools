import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PairingDisplayComponent } from './pairing-display.component';

describe('PairingDisplayComponent', () => {
  let component: PairingDisplayComponent;
  let fixture: ComponentFixture<PairingDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PairingDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PairingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

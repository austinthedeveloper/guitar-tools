import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePairingComponent } from './create-pairing.component';

describe('CreatePairingComponent', () => {
  let component: CreatePairingComponent;
  let fixture: ComponentFixture<CreatePairingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePairingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePairingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

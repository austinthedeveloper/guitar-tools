import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePedalComponent } from './create-pedal.component';

describe('CreatePedalComponent', () => {
  let component: CreatePedalComponent;
  let fixture: ComponentFixture<CreatePedalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePedalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

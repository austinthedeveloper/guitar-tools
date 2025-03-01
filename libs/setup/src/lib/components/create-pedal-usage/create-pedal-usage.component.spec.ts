import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePedalUsageComponent } from './create-pedal-usage.component';

describe('CreatePedalUsageComponent', () => {
  let component: CreatePedalUsageComponent;
  let fixture: ComponentFixture<CreatePedalUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePedalUsageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePedalUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAmpUsageComponent } from './create-amp-usage.component';

describe('CreateAmpUsageComponent', () => {
  let component: CreateAmpUsageComponent;
  let fixture: ComponentFixture<CreateAmpUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAmpUsageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAmpUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

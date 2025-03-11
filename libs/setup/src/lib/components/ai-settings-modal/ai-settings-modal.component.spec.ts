import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiSettingsModalComponent } from './ai-settings-modal.component';

describe('AiSettingsModalComponent', () => {
  let component: AiSettingsModalComponent;
  let fixture: ComponentFixture<AiSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiSettingsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AiSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

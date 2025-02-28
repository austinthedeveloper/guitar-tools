import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePedalboardComponent } from './create-pedalboard.component';

describe('CreatePedalboardComponent', () => {
  let component: CreatePedalboardComponent;
  let fixture: ComponentFixture<CreatePedalboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePedalboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePedalboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

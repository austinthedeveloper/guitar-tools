import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAmpComponent } from './create-amp.component';

describe('CreateAmpComponent', () => {
  let component: CreateAmpComponent;
  let fixture: ComponentFixture<CreateAmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAmpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

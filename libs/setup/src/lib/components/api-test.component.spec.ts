import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiTestComponent } from './api-test.component';

describe('ApiTestComponent', () => {
  let component: ApiTestComponent;
  let fixture: ComponentFixture<ApiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

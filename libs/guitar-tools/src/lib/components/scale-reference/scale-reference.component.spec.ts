import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleReferenceComponent } from './scale-reference.component';

describe('ScaleReferenceComponent', () => {
  let component: ScaleReferenceComponent;
  let fixture: ComponentFixture<ScaleReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScaleReferenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScaleReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

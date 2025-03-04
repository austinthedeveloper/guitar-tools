import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { KnobRotateDirective } from './knob-rotate.directive';

// Test component to apply the directive
@Component({
  template: `<div class="knob" [knobRotate]="value"></div>`,
})
class TestKnobComponent {
  value = 0; // Default value
}

describe('KnobRotateDirective', () => {
  let fixture: ComponentFixture<TestKnobComponent>;
  let testComponent: TestKnobComponent;
  let divElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestKnobComponent, KnobRotateDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestKnobComponent);
    testComponent = fixture.componentInstance;
    divElement = fixture.nativeElement.querySelector('.knob');
  });

  it('should create an instance of the directive', () => {
    expect(divElement).toBeTruthy();
  });

  it('should set correct rotation for value 0', () => {
    testComponent.value = 0;
    fixture.detectChanges();
    expect(divElement.style.transform).toBe('rotate(-135deg)');
  });

  it('should set correct rotation for value 50', () => {
    testComponent.value = 50;
    fixture.detectChanges();
    expect(divElement.style.transform).toBe('rotate(0deg)');
  });

  it('should set correct rotation for value 100', () => {
    testComponent.value = 100;
    fixture.detectChanges();
    expect(divElement.style.transform).toBe('rotate(135deg)');
  });

  it('should update rotation when input value changes', () => {
    testComponent.value = 25;
    fixture.detectChanges();
    expect(divElement.style.transform).toBe('rotate(-67.5deg)');

    testComponent.value = 75;
    fixture.detectChanges();
    expect(divElement.style.transform).toBe('rotate(67.5deg)');
  });
});

/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetronomeBarsComponent } from './metronome-bars.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('MetronomeBarsComponent', () => {
  let component: MetronomeBarsComponent;
  let fixture: ComponentFixture<MetronomeBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MetronomeBarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetronomeBarsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of bars', () => {
    component.bars = [1, 2, 3, 4];
    fixture.detectChanges();

    const bars = fixture.debugElement.queryAll(By.css('.bar'));
    expect(bars.length).toBe(4);
  });

  it('should apply the "active" class to the active bar', () => {
    component.bars = [1, 2, 3, 4];
    component.activeBar = 2; // Set the active bar to the second one
    fixture.detectChanges();

    const activeBar = fixture.debugElement.query(By.css('.bar.active'));
    expect(activeBar.nativeElement.id).toBe('bar-2');
  });

  it('should update the active bar when the activeBar input changes', () => {
    component.bars = [1, 2, 3, 4];

    // Set initial active bar and trigger change detection
    component.activeBar = 1;
    fixture.detectChanges();

    // Check initial active bar
    let activeBar = fixture.debugElement.query(By.css('.bar.active'));
    expect(activeBar.nativeElement.id).toBe('bar-1');

    // Update the active bar and trigger change detection
    component.activeBar = 3;

    // Manually mark the component for change detection due to OnPush strategy
    fixture.detectChanges();

    // Ensure the active class is updated
    activeBar = fixture.debugElement.query(By.css('.bar.active'));
    expect(activeBar.nativeElement.id).toBe('bar-3');
  });

  it('should not have an active bar when activeBar is 0', () => {
    component.bars = [1, 2, 3, 4];
    component.activeBar = 0; // No active bar
    fixture.detectChanges();

    const activeBars = fixture.debugElement.queryAll(By.css('.bar.active'));
    expect(activeBars.length).toBe(0);
  });
});

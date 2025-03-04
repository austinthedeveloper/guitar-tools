import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-pedal-toggle',
  templateUrl: './pedal-toggle.component.html',
  styleUrl: './pedal-toggle.component.scss',
})
export class PedalToggleComponent {
  @Input() isOn = false;
  @Output() toggle = new EventEmitter<boolean>();

  togglePedal() {
    this.isOn = !this.isOn;
    this.toggle.emit(this.isOn);
  }
}

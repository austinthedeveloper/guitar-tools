import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'lib-pedal-toggle',
    templateUrl: './pedal-toggle.component.html',
    styleUrl: './pedal-toggle.component.scss',
    standalone: false
})
export class PedalToggleComponent {
  @Input() isOn = false;
  @Input() formCtrl = new FormControl(false);
  @Output() toggle = new EventEmitter<boolean>();

  togglePedal() {
    this.isOn = !this.isOn;
    this.formCtrl.patchValue(this.isOn);
    this.toggle.emit(this.isOn);
  }
}

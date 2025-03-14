import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Pedal } from '@guitar/interfaces';

@Component({
  selector: 'lib-pedal-display',
  templateUrl: './pedal-display.component.html',
  styleUrls: ['./pedal-display.component.scss'],
})
export class PedalDisplayComponent {
  @Input() pedal!: Pedal;
  @Input() values: Record<string, number> = {};
  @Input() isOn = false;
  @Input() canToggle = false;
  @Input() canEdit = false;
  @Input() formGrp!: FormGroup<{
    [x: string]: FormControl<number>;
  }>;
  @Input() active!: string;
  @Input() showMenu = false;
  @Output() menuClick = new EventEmitter<{
    type: string;
    id: string;
    pedal: Pedal;
  }>();
  @Output() toggle = new EventEmitter<boolean>();
  menu = [
    {
      name: 'Edit Pedal',
      value: 'edit',
    },
    {
      name: 'Remove Pedal',
      value: 'remove',
    },
  ];

  onKnobClick(name: string) {
    if (!this.canEdit) return;
    this.active = this.active !== name ? name : undefined;
  }

  onMenuClick(type: string, id: string, pedal: Pedal) {
    this.menuClick.emit({ type, id, pedal });
  }
}

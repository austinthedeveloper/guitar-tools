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
  @Input() canToggle = false;
  @Input() canEdit = false;
  @Input() formGrp!: FormGroup<{
    [x: string]: FormControl<number>;
  }>;
  @Input() active!: string;

  onKnobClick(name: string) {
    if (!this.canEdit) return;
    this.active = this.active !== name ? name : undefined;
  }

  @Output() toggle = new EventEmitter<boolean>();
}

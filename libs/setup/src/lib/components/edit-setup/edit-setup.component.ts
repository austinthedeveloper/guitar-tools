import { PairingService } from './../../services/pairing.service';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  AiSettingsResponse,
  AiSuggestionPayload,
  Amp,
  AmpControl,
  Pairing,
  PairingControlValues,
  PairingPayload,
  Pedal,
  PedalBoard,
  PedalBoardPedal,
  PedalEntry,
} from '@guitar/interfaces';

import {
  ControlGroup,
  PedalControlGroupNew,
  PedalFormGroup,
  PedalKnob,
} from '../../interfaces';
import { AiSuggestionsService } from '../../services';

@Component({
  selector: 'lib-edit-setup',
  templateUrl: './edit-setup.component.html',
  styleUrl: './edit-setup.component.scss',
})
export class EditSetupComponent {
  @Input() amps: Amp[] = [];
  @Input() pedals: Pedal[] = [];
  @Input() pedalboards: PedalBoard[] = [];
  @Input() pairing!: Pairing;

  @Output() deletePairing = new EventEmitter<string>();
  private fb = inject(NonNullableFormBuilder);
  private pairingService = inject(PairingService);
  private aiSuggestionsService = inject(AiSuggestionsService);
  form: FormGroup<PedalFormGroup> = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    ampId: '',
    pedalboardId: '',
    pedals: this.fb.array<FormGroup<PedalControlGroupNew>>([]),
    controlValues: this.fb.array<FormGroup<ControlGroup>>([]),
  });
  ampControls: AmpControl[] = [];
  pedalboard!: PedalBoard;

  get controlValues() {
    return this.form.controls.controlValues;
  }

  get pedalValues() {
    return this.form.controls.pedals;
  }

  ngOnChanges({ pairing }: SimpleChanges) {
    if (pairing) {
      this.form.patchValue({
        _id: this.pairing._id,
        name: this.pairing.name,
        ampId: this.pairing.ampId,
        pedalboardId: this.pairing.pedalboardId,
      });
      if (this.pairing.ampId) {
        this.onAmpChange();
      }
      if (this.pairing.pedalboardId) {
        this.onPedalboardChange();
      }
    }
  }

  onAmpChange() {
    const selectedAmpId = this.form.controls.ampId.value;
    const selectedAmp = this.amps.find((amp) => amp._id === selectedAmpId);

    if (!selectedAmp) return;
    const controlValues = this.pairing?.controlValues;
    this.ampControls = selectedAmp.controls;
    this.controlValues.clear();
    this.ampControls.forEach((control) => {
      // Set the values if Control Values exists (Edit)
      const value = controlValues
        ? controlValues.find((v) => v.name === control.name)?.value || 0
        : 50;
      this.controlValues.push(
        this.fb.group({
          name: control.name,
          type: control.type,
          value: [value],
        })
      );
    });
  }

  onPedalboardChange() {
    const pedals = this.pairing?.pedals;
    const pedalboardId = this.form.controls.pedalboardId.value;
    this.pedalboard = this.pedalboards.find(
      (board) => board._id === pedalboardId
    );
    this.form.controls.pedals.clear();
    this.pedalboard.pedals.forEach((pedal, index) => {
      const matched = pedals
        ? pedals.find((p) => p.pedalId === pedal.pedalId)
        : undefined;
      this.addPedal(pedal, index, matched);
    });
  }

  private addPedal(pedal: PedalBoardPedal, index: number, value?: PedalEntry) {
    const knobs =
      value?.knobs ||
      pedal.pedal.knobs.reduce((acc, item) => {
        acc[item] = 50;
        return acc;
      }, {} as Record<string, number>);
    const pedalForm = this.fb.group({
      pedalId: [pedal.pedalId, Validators.required],
      order: [index, Validators.required],
      on: value ? value.on : false,
      pedal: pedal,
      knobs: this.fb.group(knobs),
    });

    this.form.controls.pedals.push(pedalForm);
  }
  submit() {
    const { _id, ...formValue } = this.form.value;
    const payload: PairingPayload = {
      ...formValue,
      pedals: formValue.pedals.map(({ pedal, ...rest }) => rest as PedalEntry),
    };
    const call = _id
      ? this.pairingService.updatePairing(_id, payload)
      : this.pairingService.createPairing(payload);

    call.subscribe((res) => this.form.controls._id.patchValue(res._id));
  }

  // AI
  async fetchAiSettings() {
    const ampId = this.form.controls.ampId.value;
    const pedalboardId = this.form.controls.pedalboardId.value;

    const selectedAmp = this.amps.find((amp) => amp._id === ampId);
    const selectedPedalboard = this.pedalboards.find(
      (pb) => pb._id === pedalboardId
    );

    const selectedPedals =
      selectedPedalboard?.pedals.map(
        (p) => `${p.pedal.name} (Type: ${p.pedal.type})`
      ) || [];

    if (!selectedAmp || !selectedPedalboard) return;

    const requestBody: AiSuggestionPayload = {
      amp: selectedAmp.name,
      pedals: selectedPedals,
      genre: 'Blues', // Optional: Add genre selection later
    };

    this.aiSuggestionsService
      .fetchSettings(requestBody)
      .subscribe((response) => {
        this.applyAiSettings(response);
      });
  }

  applyAiSettings(aiData: AiSettingsResponse) {
    if (!aiData || !aiData.amp || !aiData.pedals) return;

    const ampSettings = aiData.amp.settings;
    const pedalSettings = aiData.pedals;

    // Apply amp settings
    this.controlValues.controls.forEach((control) => {
      const newValue: number =
        ampSettings[control.value.name.toLocaleLowerCase()];

      if (!newValue) return;
      control.controls.value.patchValue(newValue);
    });

    this.pedalValues.controls.forEach((control) => {
      const newValues = pedalSettings.find(
        (s: any) => s.name === control.value.pedal.pedal.name
      );
      //  Apply the settings if there is a match
      if (newValues) {
        const knobs = control.controls.knobs;
        knobs.patchValue(newValues.settings);
      }
    });
  }
}

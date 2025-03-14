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
  Amp,
  AmpControl,
  Pairing,
  PairingPayload,
  Pedal,
  PedalBoard,
  PedalBoardPedal,
  PedalEntry,
} from '@guitar/interfaces';
import { BehaviorSubject, filter, Observable, switchMap, tap } from 'rxjs';

import {
  ControlGroup,
  PedalControlGroupNew,
  PedalFormGroup,
} from '../../interfaces';
import { SetupModalService } from '../../services';
import { PedalBoardStore } from './../../+state/pedalboard.store';
import { PairingService } from './../../services/pairing.service';
import { PedalBoardService } from './../../services/pedalboard.service';

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
  @Input() canEdit = true;

  @Output() deletePairing = new EventEmitter<string>();
  private fb = inject(NonNullableFormBuilder);
  private pairingService = inject(PairingService);
  private pedalBoardStore = inject(PedalBoardStore);
  private pedalBoardService = inject(PedalBoardService);
  private setupModalService = inject(SetupModalService);

  activeControl!: any;
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
  private _pedalboardId = new BehaviorSubject<string | null>(null);
  pedalboard$: Observable<PedalBoard> = this._pedalboardId.pipe(
    switchMap((id) => this.pedalBoardStore.getOne(id)),
    filter((item) => !!item),
    tap((board) => {
      const pedals = this.pairing?.pedals || [];
      this.setPedalboard(pedals, board._id, board);
    })
  );
  private sub = this.pedalboard$.subscribe();

  get controlValues() {
    return this.form.controls.controlValues;
  }

  get pedalValues() {
    return this.form.controls.pedals;
  }

  ngOnChanges({ pairing }: SimpleChanges) {
    if (pairing && pairing.currentValue) {
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

  ngOnDestroy() {
    this.sub.unsubscribe();
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
        : this.setDefaultAmpValue(control.type);
      this.controlValues.push(
        this.fb.group({
          name: control.name,
          type: control.type,
          value: [value],
        })
      );
    });
  }

  private setDefaultAmpValue(type: string) {
    if (type === 'knob') return 50;
    return false;
  }

  onPedalboardChange() {
    const pedalboardId = this.form.controls.pedalboardId.value;
    this._pedalboardId.next(pedalboardId);
  }

  private setPedalboard(
    pedals: PedalEntry[],
    pedalboardId: string,
    pedalboard?: PedalBoard
  ) {
    this.pedalboard =
      pedalboard ||
      this.pedalboards.find((board) => board._id === pedalboardId);
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
      _id: pedal._id,
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

  openAiModal() {
    // Build the amp string
    const amp = this.form.controls.ampId.value;
    const selectedAmp = this.amps.find((a) => a._id === amp);
    let ampBuilt = '';
    if (selectedAmp) {
      const ampKnobs = this.controlValues.value.map((v) => v.name);
      ampBuilt = `${selectedAmp.name || 'N/A'} (Brand: ${
        selectedAmp.brand || 'N/A'
      }, Knobs: ${ampKnobs.join(',')})`;
    }
    // Build the pedalboard string
    const pedals = this.pedalValues.value.map((p) => {
      const knobs = Object.keys(p.pedal.knobValues);
      const type = p.pedal.pedal.type;
      const built = `${p.pedal.pedal.name} (Type: ${type}, Knobs: ${knobs.join(
        ','
      )})`;
      return built;
    });
    const pedalboardId = this.pedalboard?._id;
    const instance = this.setupModalService.openAiModal(
      ampBuilt,
      pedals,
      pedalboardId
    );
    instance.result.then((aiData: AiSettingsResponse) => {
      if (!aiData) return;
      this.applyAiSettings(aiData);
    });
  }

  // AI

  applyAiSettings(aiData: AiSettingsResponse) {
    if (!aiData || !aiData.amp || !aiData.pedals) return;

    const ampSettings = aiData.amp.settings;
    const pedalSettings = aiData.pedals;

    // Apply amp settings
    this.controlValues.controls.forEach((control) => {
      const newValue: number = ampSettings[control.value.name];

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

  onMenuClick(
    action: { type: string; id: string; pedal?: Pedal },
    pedalId: string
  ) {
    switch (action.type) {
      case 'remove':
        this.pedalBoardService
          .removeFromPedalboard(this.pedalboard._id, pedalId)
          .subscribe();
        break;
      case 'edit':
        this.openPedalModal(action.pedal);
        break;
    }
  }

  private openPedalModal(pedal?: Pedal) {
    this.setupModalService.openPedalModal(pedal);
  }

  // Amp
  onControlKnobClick(group: FormGroup<ControlGroup>) {
    const name = group.controls.name.value;
    const type = group.controls.type.value;
    switch (type) {
      case 'input':
      case 'switch':
        group.controls.value.patchValue(!group.controls.value.value);
        break;
      default:
        this.activeControl = name;
        break;
    }
  }
}

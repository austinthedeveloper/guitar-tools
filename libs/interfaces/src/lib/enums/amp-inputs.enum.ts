export enum AmpInputControlType {
  'input',
  'knob',
  'switch',
  'selector',
}

export const AmpInputControls = ['input', 'knob', 'switch', 'selector'].map(
  (control, index) => ({ name: control, value: index })
);

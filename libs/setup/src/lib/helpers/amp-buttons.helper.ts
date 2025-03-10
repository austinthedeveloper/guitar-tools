import { KnobType } from '@guitar/interfaces';

export const AMP_BUTTONS: KnobType[] = [{ name: 'Overdrive', type: 'switch' }];
export const AMP_BUTTON_NAMES = AMP_BUTTONS.map((k) => k.name);

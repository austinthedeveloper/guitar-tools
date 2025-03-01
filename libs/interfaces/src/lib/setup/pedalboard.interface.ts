import { BaseDocument } from '../base-document.interface';
import { Pedal } from './pedal.interface';

/** ✅ Pedal Configuration Inside a Pedal Board */
export interface PedalBoardPedal {
  pedalId: string;
  order: number;
  knobValues: Record<string, number>;
  pedal: Pedal;
  // Used in forms
  knobs?: {
    name: string;
    value: number;
  }[];
}

/** ✅ Request Payload to Create a Pedal Board */
export interface CreatePedalBoardRequest {
  name: string;
  pedals: PedalBoardPedal[];
}

/** ✅ Pedal Board Document from Mongo */
export interface PedalBoard extends BaseDocument {
  name: string;
  pedals: PedalBoardPedal[];
  createdById: string;
}

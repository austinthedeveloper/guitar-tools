import { BaseDocument } from '../base-document.interface';
import { AmpUsage } from './amp-usage.interface';
import { Amp } from './amp.interface';
import { Pedal } from './pedal.interface';
import { PedalBoard } from './pedalboard.interface';

/** ✅ Request Payload for Pairing an Amp with a PedalBoard */
export interface CreatePairingRequest {
  ampUsageId: string;
  pedalBoardId: string;
}

export interface PairingPayload {
  _id?: string;
  pedals: PedalEntry[];
  name?: string;
  ampId?: string;
  pedalboardId?: string;
  controlValues?: Partial<{
    name: string;
    type: string;
    value: number;
  }>[];
}

export interface PedalEntry {
  pedalId: string;
  order: number;
  on: boolean;
  knobs: {
    [x: string]: number;
  };
  pedal: Pedal;
}

/** ✅ Pairing Document from Mongo */
export interface Pairing extends BaseDocument {
  pedals: PedalEntry[];
  name: string;
  ampId?: string;
  amp?: Amp;
  pedalboardId?: string;
  pedalboard?: PedalBoard;
  controlValues?: {
    name: string;
    type: string;
    value: number;
  }[];
  createdById: string;
}

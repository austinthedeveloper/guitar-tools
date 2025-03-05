import { BaseDocument } from '../base-document.interface';
import { AmpUsage } from './amp-usage.interface';
import { Amp } from './amp.interface';
import { PedalBoard } from './pedalboard.interface';

/** ✅ Request Payload for Pairing an Amp with a PedalBoard */
export interface CreatePairingRequest {
  ampUsageId: string;
  pedalBoardId: string;
}

export interface PairingPayload {
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
}

/** ✅ Pairing Document from Mongo */
export interface Pairing extends BaseDocument {
  ampUsageId: string;
  ampUsage: AmpUsage;
  pedalBoardId: string;
  pedalBoard: PedalBoard;
  createdById: string;
}

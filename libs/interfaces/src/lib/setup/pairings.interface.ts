import { BaseDocument } from '../base-document.interface';
import { Amp } from './amp.interface';
import { PedalBoard } from './pedalboard.interface';

/** ✅ Request Payload for Pairing an Amp with a PedalBoard */
export interface CreatePairingRequest {
  ampId: string;
  pedalBoardId: string;
}

/** ✅ Pairing Document from Mongo */
export interface Pairing extends BaseDocument {
  ampId: string;
  amp: Amp;
  pedalBoardId: string;
  pedalBoard: PedalBoard;
  createdById: string;
}

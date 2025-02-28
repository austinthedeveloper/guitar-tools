import { BaseDocument } from '../base-document.interface';

/** ✅ Request Payload for Pairing an Amp with a PedalBoard */
export interface CreatePairingRequest {
  ampId: string;
  pedalBoardId: string;
}

/** ✅ Pairing Document from Mongo */
export interface Pairing extends BaseDocument {
  ampId: string;
  pedalBoardId: string;
  createdById: string;
}

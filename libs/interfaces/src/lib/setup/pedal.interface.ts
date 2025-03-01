import { BaseDocument } from '../base-document.interface';

export interface CreatePedalRequest {
  name: string;
  type?: string; // e.g., Overdrive, Fuzz
  knobs?: string[];
}

/** ✅ Pedal Document from Mongo */
export interface Pedal extends BaseDocument {
  name: string;
  type?: string;
  knobs?: string[];
  createdById: string;
}

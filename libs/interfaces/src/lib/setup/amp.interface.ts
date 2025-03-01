import { BaseDocument } from '../base-document.interface';

/** ✅ Request Payload to Create an Amp */
export interface CreateAmpRequest {
  name: string;
  brand?: string;
  inputs: string[];
  knobs: AmpKnob[];
}

/** ✅ Amp Document from Mongo */
export interface Amp extends BaseDocument {
  name: string;
  brand?: string;
  inputs: AmpKnob[];
  knobs: any[];
  createdById: string;
}

export interface AmpKnob {
  name: string;
  value?: number;
  order: number;
}

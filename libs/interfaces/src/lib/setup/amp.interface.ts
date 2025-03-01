import { BaseDocument } from '../base-document.interface';
import { AmpInputControlType } from '../enums';

/** ✅ Request Payload to Create an Amp */
export interface CreateAmpRequest {
  name: string;
  brand?: string;
  controls: AmpControl[];
}

/** ✅ Amp Document from Mongo */
export interface Amp extends BaseDocument {
  name: string;
  brand?: string;
  controls: AmpControl[];
  createdById: string;
  // OLD
  inputs: AmpKnob[];
  knobs: any[];
}

export interface AmpKnob {
  name: string;
  value?: number;
  order: number;
}

export interface AmpControl {
  name: string;
  type: string;
  order: number;
  values?: string[];
}

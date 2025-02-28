import { BaseDocument } from '../base-document.interface';

/** ✅ Request Payload to Create an Amp */
export interface CreateAmpRequest {
  name: string;
  inputs: string[];
  knobs: string[];
}

/** ✅ Amp Document from Mongo */
export interface Amp extends BaseDocument {
  name: string;
  inputs: string[];
  knobs: string[];
  createdById: string;
}

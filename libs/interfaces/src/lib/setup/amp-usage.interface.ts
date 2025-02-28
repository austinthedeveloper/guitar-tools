import { BaseDocument } from '../base-document.interface';
import { Amp } from './amp.interface';

/** ✅ Request Payload for Saving Amp Usage */
export interface SaveAmpUsageRequest {
  ampId: string;
  knobValues: Record<string, number>;
}

/** ✅ Amp Usage Document from Mongo */
export interface AmpUsage extends BaseDocument {
  ampId: string;
  amp: Amp;
  knobValues: Record<string, number>;
  createdById: string;
}

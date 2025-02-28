import { BaseDocument } from '../base-document.interface';

/** ✅ Request Payload for Saving Amp Usage */
export interface SaveAmpUsageRequest {
  ampId: string;
  knobValues: Record<string, number>;
}

/** ✅ Amp Usage Document from Mongo */
export interface AmpUsage extends BaseDocument {
  ampId: string;
  knobValues: Record<string, number>;
  createdById: string;
}

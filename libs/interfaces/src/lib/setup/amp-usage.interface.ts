import { BaseDocument } from '../base-document.interface';
import { Amp } from './amp.interface';

/** ✅ Request Payload for Saving Amp Usage */
export interface SaveAmpUsageRequest {
  name: string;
  ampId: string;
  controlValues: Record<string, any>;
}

/** ✅ Amp Usage Document from Mongo */
export interface AmpUsage extends BaseDocument {
  name: string;
  ampId: string;
  amp: Amp;
  controlValues: Record<string, any>;
  createdById: string;
}

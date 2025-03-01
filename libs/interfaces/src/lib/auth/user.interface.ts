import { BaseDocument } from '../base-document.interface';

export interface UserProfile extends BaseDocument {
  displayName: string;
  email: string;
  photoUrl: string;
}

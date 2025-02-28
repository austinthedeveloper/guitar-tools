import { Types } from 'mongoose';

export function validateObjectId(id: string): Types.ObjectId {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ObjectId');
  }
  return new Types.ObjectId(id);
}

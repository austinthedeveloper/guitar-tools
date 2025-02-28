import { Request } from 'express';

export interface AuthRequest extends Request {
  user: { _id: string; email: string; displayName: string; photoUrl: string }; // Extend the default Request
}

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import UserModel, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser | null;
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing auth token' });
    }
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await UserModel.findById(decoded.id).select('-passwordHash').lean();
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user as any;
    next();
  } catch (err) {
    next(err);
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if ((req.user as any).role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}
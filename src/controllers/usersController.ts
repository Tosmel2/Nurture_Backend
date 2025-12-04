import { AuthRequest } from '../middleware/auth';
import { Response } from 'express';
import UserModel from '../models/User';

export async function getProfile(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const user = await UserModel.findById(req.user._id).select('-passwordHash').lean();
  res.json({ user });
}

export async function updateProfile(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const updates = (({ name }) => ({ name }))(req.body); // allow only name here; expand as needed
  const user = await UserModel.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-passwordHash').lean();
  res.json({ user });
}
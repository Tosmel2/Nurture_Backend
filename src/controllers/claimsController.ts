import { Request, Response } from 'express';
import ClaimModel from '../models/Claim';
import { AuthRequest } from '../middleware/auth';

export async function submitClaim(req: AuthRequest, res: Response) {
  const { amount, description } = req.body;
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const receiptPath = req.file ? req.file.path : undefined;
  const claim = await ClaimModel.create({
    user: req.user._id,
    amount: Number(amount || 0),
    description,
    receiptPath
  });

  res.status(201).json({ claim });
}

export async function listUserClaims(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const claims = await ClaimModel.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
  res.json({ claims });
}

export async function listAllClaims(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if ((req.user as any).role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const claims = await ClaimModel.find().populate('user', 'name email').sort({ createdAt: -1 }).lean();
  res.json({ claims });
}
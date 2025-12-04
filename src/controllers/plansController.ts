import { Request, Response } from 'express';
import PlanModel from '../models/Plan';

export async function listPlans(req: Request, res: Response) {
  const plans = await PlanModel.find({ active: true }).lean();
  res.json({ plans });
}

export async function getPlan(req: Request, res: Response) {
  const plan = await PlanModel.findById(req.params.id).lean();
  if (!plan) return res.status(404).json({ message: 'Plan not found' });
  res.json({ plan });
}
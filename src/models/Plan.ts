import mongoose, { Schema, Document, model } from 'mongoose';

export interface IPlan extends Document {
  title: string;
  slug?: string;
  description?: string;
  price: number;
  features?: string[];
  active: boolean;
  createdAt: Date;
}

const PlanSchema = new Schema<IPlan>({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  description: String,
  price: { type: Number, required: true },
  features: [String],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default model<IPlan>('Plan', PlanSchema);
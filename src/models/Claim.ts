import mongoose, { Schema, Document, model, Types } from 'mongoose';

export interface IClaim extends Document {
  user: Types.ObjectId;
  amount: number;
  description?: string;
  status: 'submitted' | 'processing' | 'paid' | 'rejected';
  receiptPath?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClaimSchema = new Schema<IClaim>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  description: String,
  status: { type: String, default: 'submitted' },
  receiptPath: String
}, { timestamps: true });

export default model<IClaim>('Claim', ClaimSchema);
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';

export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  const existing = await UserModel.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: 'Email already in use' });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await UserModel.create({ name, email: email.toLowerCase(), passwordHash });
  const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function me(req: any, res: Response) {
  // requireAuth already attaches user info
  res.json({ user: req.user });
}

// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import UserModel from '../models/User';
// import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';

// export async function signup(req: Request, res: Response) {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

//   const existing = await UserModel.findOne({ email: email.toLowerCase() });
//   if (existing) return res.status(409).json({ message: 'Email already in use' });

//   const salt = await bcrypt.genSalt(10);
//   const passwordHash = await bcrypt.hash(password, salt);

//   const user = await UserModel.create({ name, email: email.toLowerCase(), passwordHash });
//   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//   res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
// }

// export async function signin(req: Request, res: Response) {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

//   const user = await UserModel.findOne({ email: email.toLowerCase() });
//   if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//   const valid = await bcrypt.compare(password, user.passwordHash);
//   if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

//   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
//   res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
// }

// export async function me(req: any, res: Response) {
//   // requireAuth already attaches user info
//   res.json({ user: req.user });
// }
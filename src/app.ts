import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import path from 'path';
import { connectDB } from './utils/db';
import authRoutes from './routes/auth';
import plansRoutes from './routes/plans';
import claimsRoutes from './routes/claims';
import usersRoutes from './routes/users';

dotenv.config();

const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/users', usersRoutes);

// Basic healthcheck
app.get('/api/ping', (req, res) => res.json({ ok: true }));

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// Start DB and server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });

export default app;
import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getProfile, updateProfile } from '../controllers/usersController';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.patch('/me', requireAuth, updateProfile);

export default router;
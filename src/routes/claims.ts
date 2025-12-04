import { Router } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth';
import { submitClaim, listUserClaims, listAllClaims } from '../controllers/claimsController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', requireAuth, upload.single('receipt'), submitClaim);
router.get('/', requireAuth, listUserClaims);
router.get('/admin', requireAuth, listAllClaims); // admin-only in controller

export default router;
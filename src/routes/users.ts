import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/user';

const router = Router();

router.get('/', (req: Request, res: Response) => {});
router.post('/register', registerUser);

export default router;

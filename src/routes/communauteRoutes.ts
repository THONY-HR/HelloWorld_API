import { Router } from 'express';
import { 
    getCommunaute,
    createCommunaute
} from '../controllers/communauteController';

const router = Router();

router.get('/getCommunaute', getCommunaute);
router.post('/creeCommunaute', createCommunaute);

export default router;
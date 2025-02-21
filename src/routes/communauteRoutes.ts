import { Router } from 'express';
import { 
    getCommunaute,
    createCommunaute,
    updateCommunaute
} from '../controllers/communauteController';

const router = Router();

router.get('/getCommunaute', getCommunaute);
router.post('/creeCommunaute', createCommunaute);
router.put('/updateCommunaute/:pays', updateCommunaute);

export default router;
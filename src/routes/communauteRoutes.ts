import { Router } from 'express';
import { 
    getCommunaute,
    createCommunaute,
    deleteCommunaute
} from '../controllers/communauteController';

const router = Router();

router.get('/getCommunaute', getCommunaute);
router.post('/creeCommunaute', createCommunaute);
router.delete('/deleteCommunaute', deleteCommunaute);

export default router;
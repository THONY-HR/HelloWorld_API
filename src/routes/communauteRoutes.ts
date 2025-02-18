import { Router } from 'express';
import { 
    getCommunaute
} from '../controllers/communauteController';

const router = Router();

router.get('/getCommunaute', getCommunaute);

export default router;
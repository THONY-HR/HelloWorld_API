import { Router } from 'express';
import { 
    getSousCommunaute,
    createSousCommunaute,
    updateSousCommunaute,
    getSousCommunauteById,
    getSousCommunauteDiscussion
} from '../controllers/sousCommunauteController';

const router = Router();

router.get('/getSousCommunaute', getSousCommunaute);
router.get('/getSousCommunauteDetailleById/:id', getSousCommunauteById);
router.get('/getSousCommunauteDiscussion/:id', getSousCommunauteDiscussion);
router.post('/creeSousCommunaute', createSousCommunaute);
router.put('/updateSousCommunaute/:id', updateSousCommunaute);

export default router;
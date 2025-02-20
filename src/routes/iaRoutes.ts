import { Router } from 'express';
import { 
    chatMistral
} from '../controllers/iaController';

const router = Router();

router.post('/mistral', chatMistral);

export default router;
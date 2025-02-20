import { Router } from 'express';
import { chatMistral, chatDeepseek} from '../controllers/iaController';

const router = Router();

router.post('/mistral', chatMistral);
router.post('/deepseek', chatDeepseek);

export default router;
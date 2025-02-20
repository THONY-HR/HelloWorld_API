import { Router } from 'express';
import { chatMistral, chatDeepseek8B,chatDeepseek32B} from '../controllers/iaController';

const router = Router();

router.post('/mistral', chatMistral);
router.post('/deepseek-8B', chatDeepseek8B);
router.post('/deepseek-32B', chatDeepseek32B);

export default router;
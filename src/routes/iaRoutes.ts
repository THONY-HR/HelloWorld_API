import { Router } from 'express';
import { chatMistral, chatDeepseek8B,chatDeepseek32B,chatQwen,chatDeepseekFree,chatDeepseek} from '../controllers/iaController';

const router = Router();

router.post('/mistral-24B', chatMistral);
router.post('/deepseek-free', chatDeepseekFree);
router.post('/deepseek-8B', chatDeepseek8B);
router.post('/deepseek-32B', chatDeepseek32B);
router.post('/deepseek', chatDeepseek);
router.post('/qwen-turbo', chatQwen);
export default router;
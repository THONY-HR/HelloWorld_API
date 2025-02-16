import { Router } from 'express';
import { getUsers, createUser , loginUser, updateUser} from '../controllers/userController';

const router = Router();

router.get('/getUser', getUsers);
router.post('/createUser', createUser);
router.post('/login',loginUser);
router.put('/update',updateUser);

export default router;

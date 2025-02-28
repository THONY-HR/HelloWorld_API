import { Router } from 'express';
import { 
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categorieController';

const router = Router();

router.get('/getAllCategories', getAllCategories);
router.get('/getCategoryById/:id', getCategoryById);
router.post('/createCategory', createCategory);
router.put('/updateCategory/:id', updateCategory);
router.delete('/deleteCategory/:id', deleteCategory);

export default router;

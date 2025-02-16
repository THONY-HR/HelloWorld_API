import { Router } from 'express';
import { 
  getUtilisateurs, 
  getUtilisateurById, 
  createUtilisateur, 
  updateUtilisateur, 
  deleteUtilisateur, 
  loginUtilisateur 
} from '../controllers/utilisateurController';

const router = Router();

router.get('/getUtilisateurs', getUtilisateurs);
router.get('/getUtilisateur/:id', getUtilisateurById);
router.post('/CreeUtilisateur', createUtilisateur);
router.put('/updateUtilisateur/:id', updateUtilisateur);
router.delete('/deleteUtilisateur/:id', deleteUtilisateur);
router.post('/loginUtilisateur/login', loginUtilisateur);

export default router;

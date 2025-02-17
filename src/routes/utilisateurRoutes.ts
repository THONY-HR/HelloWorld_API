import { Router } from 'express';
import { 
  getUtilisateurs, 
  getUtilisateurByEmail, 
  createUtilisateur, 
  updateUtilisateur, 
  deleteUtilisateur, 
  loginUtilisateur 
} from '../controllers/utilisateurController';

const router = Router();

router.get('/getUtilisateurs', getUtilisateurs);
router.get('/getUtilisateur/:mail', getUtilisateurByEmail);
router.post('/creeUtilisateur', createUtilisateur);
router.put('/updateUtilisateur/:email', updateUtilisateur);
router.delete('/deleteUtilisateur/:id', deleteUtilisateur);
router.post('/loginUtilisateur', loginUtilisateur);

export default router;

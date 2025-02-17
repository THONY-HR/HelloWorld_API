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
router.post('/loginUtilisateur', loginUtilisateur);
router.put('/updateUtilisateur/:email', updateUtilisateur);
router.delete('/deleteUtilisateur/:email', deleteUtilisateur);

export default router;

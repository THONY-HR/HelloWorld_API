import { Router } from 'express';
import { 
    getAllPublications,
    getPublicationById,
    getPublicationsByUser,
    createPublication,
    updatePublication,
    deletePublication
} from '../controllers/publicationController';

const router = Router();

router.get('/getAllPublications', getAllPublications);
router.get('/getPublicationById/:id', getPublicationById); // Ajout de :id pour récupérer une publication par son id
router.get('/getPublicationsByUser/:idUtilisateur', getPublicationsByUser); // Ajout de :idUtilisateur pour filtrer par utilisateur
router.post('/createPublication', createPublication);
router.put('/updatePublication/:id', updatePublication);
router.delete('/deletePublication/:id', deletePublication); // Ajout de :id pour supprimer la publication

export default router;

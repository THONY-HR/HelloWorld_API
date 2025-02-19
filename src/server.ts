import express from 'express';
import cors from 'cors';
import path from 'path';

import utilisateurRoutes from './routes/utilisateurRoutes';
import communauteRoutes from './routes/communauteRoutes';

const app = express();
const port = 3000;

// Configuration de CORS pour autoriser toutes les origines
app.use(cors()); // Accepte toutes les URL

// Middleware pour parser le JSON
app.use(express.json());

// Utilise les routes pour les utilisateurs et les communautés
app.use('/utilisateur', utilisateurRoutes);
app.use('/communaute', communauteRoutes);

// Route pour afficher la page HTML à la racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

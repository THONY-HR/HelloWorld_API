import express from 'express';
import cors from 'cors';
import path from 'path';

import utilisateurRoutes from './routes/utilisateurRoutes';
import communauteRoutes from './routes/communauteRoutes';
import sousCommunauteRoutes from './routes/sousCommunauteRoutes';
import publicationRoutes from './routes/publicationRoutes';

import iaRoutes from './routes/iaRoutes';

const app = express();
const port = 3000;

// Configuration de CORS pour autoriser toutes les origines et méthodes
app.use(cors({
  origin: '*', // Accepte toutes les URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Accepte toutes les méthodes
}));

// Middleware pour parser le JSON
app.use(express.json());

// Utilise les routes pour les utilisateurs et les communautés
app.use('/utilisateur', utilisateurRoutes);
app.use('/communaute', communauteRoutes);
app.use('/sousCommunaute', sousCommunauteRoutes);
app.use('/publication', publicationRoutes);

// Intelligence artificiel API
app.use('/ia-Anthony', iaRoutes);

// Route pour afficher la page HTML à la racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

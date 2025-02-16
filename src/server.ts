import express from 'express';
import userRoutes from './routes/userRoutes';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json()); // Pour parser le JSON

// Utilise les routes pour les utilisateurs
app.use('/user', userRoutes);

// Route pour afficher la page HTML à la racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

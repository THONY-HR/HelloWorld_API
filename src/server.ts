import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(express.json()); // Pour parser le JSON

// Utilise les routes pour les utilisateurs
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

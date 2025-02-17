import { Request, Response } from 'express';
import prisma from '../prisma';

// Récupérer tous les utilisateurs
export const getUtilisateurs = async (req: Request, res: Response): Promise<void> => {
  try {
    const utilisateurs = await prisma.utilisateur.findMany();
    res.json(utilisateurs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un utilisateur par ID
export const getUtilisateurByEmail = async (req: Request, res: Response): Promise<void> => {
  const { mail } = req.params;
  try {
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { mail: mail },
    });
    if (!utilisateur) {
      res.status(200).json({ message: "Utilisateur non trouvé" });
      return;
    }
    res.json(utilisateur);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un nouvel utilisateur
export const createUtilisateur = async (req: Request, res: Response): Promise<void> => {
  const { nomComplet, pseudo, mail, idCommunaute, imageUrl} = req.body;
  try {
    const newUser = await prisma.utilisateur.create({
      data: { nomComplet, pseudo, mail, idCommunaute, imageUrl},
    });
    res.json({ etat: true , message: "Utilisateur créé avec succès", newUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un utilisateur
export const updateUtilisateur = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;
  const { nomComplet, pseudo, mail, idCommunaute, imageUrl} = req.body;
  try {
    const updatedUser = await prisma.utilisateur.update({
      where: { mail: email },
      data: { nomComplet, pseudo, mail, idCommunaute, imageUrl},
    });
    res.json({ message: "Utilisateur mis à jour avec succès", updatedUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un utilisateur
export const deleteUtilisateur = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;
  try {
    await prisma.utilisateur.delete({
      where: { mail: email },
    });
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Connexion utilisateur
export const loginUtilisateur = async (req: Request, res: Response): Promise<void> => {
  const { mail } = req.body;
  try {
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { mail },
    });
    if (!utilisateur) {
      res.status(401).json({ message: "Email incorrect" });
      return;
    }
    res.json({ message: "Connexion réussie", utilisateur });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

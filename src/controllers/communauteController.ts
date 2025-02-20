import { Request, Response } from 'express';
import prisma from '../prisma';
import { stringify } from 'querystring';

// Récupérer tous les Communaute
export const getCommunaute = async (req: Request, res: Response): Promise<void> => {
    try {
      const communaute = await prisma.communaute.findMany();
      res.json(communaute);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};

// Créer un nouvel utilisateur
export const createCommunaute = async (req: Request, res: Response): Promise<void> => {
  const { pays,localisation,imageUrl} = req.body;
  try {
    const newCommunaute = await prisma.communaute.create({
      data: {pays,localisation,imageUrl},
    });
    res.json({ etat: true , message: "Communaute créé avec succès", newCommunaute });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un utilisateur
export const deleteCommunaute = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // pays est déjà une string
  try {
    await prisma.communaute.delete({
      where: { id: Number(id) }, // Pas besoin de stringify()
    });
    res.json({ message: "Communauté supprimée avec succès" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

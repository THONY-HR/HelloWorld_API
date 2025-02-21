import { Request, Response } from 'express';
import prisma from '../prisma';

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

// Mettre à jour un utilisateur
export const updateCommunaute = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { pays, localisation, imageUrl } = req.body;
  try {
    const updatedUser = await prisma.communaute.update({
      where: { id: Number(id) },
      data: { pays, localisation, imageUrl},
    });
    res.json({ message: "Communaute mis à jour avec succès", updatedUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
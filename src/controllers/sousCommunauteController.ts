import { Request, Response } from 'express';
import prisma from '../prisma';

// Récupérer tous les SousCommunaute
export const getSousCommunaute = async (req: Request, res: Response): Promise<void> => {
    try {
      const Souscommunaute = await prisma.sousCommunaute.findMany();
      res.json(Souscommunaute);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};


// Récupérer une SousCommunaute par son id avec toutes ses données liées
export const getSousCommunauteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const sousCommunaute = await prisma.sousCommunaute.findUnique({
      where: { id: Number(id) },
      include: {
        communaute: true,
        categorie: true,
        publications: true,
        membres: true,
      },
    });
    if (!sousCommunaute) {
      res.status(404).json({ message: "SousCommunaute non trouvée" });
      return;
    }
    res.json(sousCommunaute);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une SousCommunaute par son id avec toutes ses données liées
export const getSousCommunauteDiscussion = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const sousCommunaute = await prisma.sousCommunaute.findUnique({
      where: { id: Number(id) },
      include: {
        discussions: true,
      },
    });
    if (!sousCommunaute) {
      res.status(404).json({ message: "SousCommunaute non trouvée" });
      return;
    }
    res.json(sousCommunaute);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un nouvel utilisateur
export const createSousCommunaute = async (req: Request, res: Response): Promise<void> => {
  const { idCommunaute,idCategorie,nom} = req.body;
  try {
    const newSousCommunaute = await prisma.sousCommunaute.create({
      data: {idCommunaute,idCategorie,nom},
    });
    res.json({ etat: true , message: "SousCommunaute créé avec succès", newSousCommunaute });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un utilisateur
export const updateSousCommunaute = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { idCommunaute, idCategorie, nom } = req.body;
  try {
    const updatedUser = await prisma.sousCommunaute.update({
      where: { id: Number(id) },
      data: { idCommunaute, idCategorie, nom},
    });
    res.json({ message: "SousCommunaute mis à jour avec succès", updatedUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
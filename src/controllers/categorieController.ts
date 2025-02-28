import { Request, Response } from 'express';
import prisma from '../prisma';

// Récupérer toutes les catégories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.categorie.findMany({
      include: {
        sousCommunautes: true, // Inclut les sous-communautés associées
      },
    });
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une catégorie par son ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const category = await prisma.categorie.findUnique({
      where: { id: Number(id) },
      include: {
        sousCommunautes: true,
      },
    });
    if (!category) {
      res.status(404).json({ message: "Catégorie non trouvée" });
      return;
    }
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une nouvelle catégorie
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { nom } = req.body;
  try {
    const newCategory = await prisma.categorie.create({
      data: { nom },
    });
    res.status(201).json({ message: "Catégorie créée avec succès", newCategory });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nom } = req.body;
  try {
    const updatedCategory = await prisma.categorie.update({
      where: { id: Number(id) },
      data: { nom },
    });
    res.json({ message: "Catégorie mise à jour avec succès", updatedCategory });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedCategory = await prisma.categorie.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Catégorie supprimée avec succès", deletedCategory });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllPublications = async (req: Request, res: Response): Promise<void> => {
    // Récupérer les paramètres de pagination depuis la requête (page et limit)
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    try {
      // Comptage total des publications
      const total = await prisma.publication.count();
      
      // Récupérer les publications avec pagination et inclusion des relations
      const publications = await prisma.publication.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        include: {
          utilisateur: true,
          sousCommunaute: true,
          reactions: true,
          commentaires: true,
        },
      });
      
      // Retourner les données paginées avec quelques métadonnées
      res.json({
        page,
        limit,
        total,
        data: publications,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  

export const getPublicationById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const publication = await prisma.publication.findUnique({
      where: { id: Number(id), deletedAt: null},
      include: {
        utilisateur: true,
        sousCommunaute: true,
        reactions: true,
        commentaires: true,
      },
    });
    if (!publication) {
      res.status(404).json({ message: "Publication non trouvée" });
      return;
    }
    res.json(publication);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPublication = async (req: Request, res: Response): Promise<void> => {
  const { titre, contenu, idUtilisateur, idSousCommunaute, mediaUrl } = req.body;
  try {
    const newPublication = await prisma.publication.create({
      data: {
        titre,
        contenu,
        idUtilisateur,
        idSousCommunaute,
        mediaUrl,
      },
    });
    res.status(201).json({ message: "Publication créée avec succès", newPublication });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer toutes les publications d'un utilisateur (avec pagination)
export const getPublicationsByUser = async (req: Request, res: Response): Promise<void> => {
    const { idUtilisateur } = req.params;
    const { page, limit } = req.query;
    const currentPage = Number(page) || 1;
    const perPage = Number(limit) || 10;
    const skip = (currentPage - 1) * perPage;
    
    try {
      const publications = await prisma.publication.findMany({
        where: {
          idUtilisateur: Number(idUtilisateur),
          deletedAt: null  // On exclut les publications supprimées (soft delete)
        },
        orderBy: { createdAt: 'desc' }, // Les plus récentes en premier
        skip: skip,
        take: perPage,
        include: {
          sousCommunaute: true,
          reactions: true,
          commentaires: true,
        },
      });
      
      res.json({
        currentPage,
        perPage,
        publications
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};

  
export const updatePublication = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { titre, contenu, mediaUrl } = req.body;
  try {
    const updatedPublication = await prisma.publication.update({
      where: { id: Number(id) },
      data: { titre, contenu, mediaUrl },
    });
    res.json({ message: "Publication mise à jour avec succès", updatedPublication });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePublication = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedPublication = await prisma.publication.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
    res.json({ message: "Publication supprimée avec succès", deletedPublication });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

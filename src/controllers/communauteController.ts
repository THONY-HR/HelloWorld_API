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
import { Request, Response } from 'express';
import prisma from '../prisma';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
    console.log(`Response status code: ${res.statusCode}`);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(`Response status code: ${res.statusCode}`);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.json(newUser);
    console.log(`Response status code: ${res.statusCode}`);
    return;
  } catch (error: any) {
    res.status(400).json({ error: error.message });
    console.log(`Response status code: ${res.statusCode}`);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        var reponse = null;
        const { name, email } = req.body; 
        const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
        });
        if (user!=null) {
            reponse = { message: "login successfuly", user };
        }else{
            reponse = {message: "Email Incorrecte"};
        }
        res.json(reponse);
        console.log(`Response status code: ${res.statusCode}`);
        return;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      console.log(`Response status code: ${res.statusCode}`);
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const indice = req.body.indice; 
        const { name, email } = req.body.data; 
        const user = await prisma.user.update({
            where: { email: indice },
            data: {name: name, email: email},
          });
        if (user!=null) {
            res.json({message: "Update successfuly",user});
            return;
        }
        res.json({message: "User non trouvé"});
        console.log(`Response status code: ${res.statusCode}`);
        return;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      console.log(`Response status code: ${res.statusCode}`);
    }
};

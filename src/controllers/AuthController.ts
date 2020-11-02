import { Request, Response } from 'express';
import { CustomerType } from '../types';
import treatEmail from '../utils/treatEmail';

export = {
  async signup(req: Request, res: Response) {
    const { name, email, password }: CustomerType = req.body;

    if (!name || name.length <= 3) return res.status(400).json('Nome inválido');

    const emailTest: boolean = treatEmail(email);
    if (!emailTest) return res.status(400).json('Email Invalido');

    if (!password || password.length < 8) return res.status(400).json('Senha inválida');

    return res.status(201).json({ message: 'Tudo certo!' });
  },
}

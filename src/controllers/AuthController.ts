import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { CustomerType } from '../types';
import treatEmail from '../utils/treatEmail';

export = {
  async sigin(req: Request, res: Response) {
    const { email, password }: CustomerType = req.body;
    return res.status(200).json({ email, password });
  },

  async signup(req: Request, res: Response) {
    const { name, email, password }: CustomerType = req.body;
    const id = uuid();

    if (!name || name.length <= 3) return res.status(400).json('Nome inválido');

    const emailTest: boolean = treatEmail(email);
    if (!emailTest) return res.status(400).json('Email Invalido');

    if (!password || password.length < 8) return res.status(400).json('Senha inválida');

    return res.status(201).json({ message: 'Tudo certo!', id });
  },
}

import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { CustomerType } from '../types';
import treatEmail from '../utils/treatEmail';
import Customer from '../models/Customer';

export = {
  async signin(req: Request, res: Response) {
    const { email, password }: CustomerType = req.body;
    return res.status(200).json({ email, password });
  },

  async signup(req: Request, res: Response) {
    const { name, email, password }: CustomerType = req.body;
    const id = uuid();

    if (!name || name.length <= 3) return res.status(400).json('Nome inválido');

    const emailTest: boolean = treatEmail(email);
    if (!emailTest) return res.status(400).json('Email Invalido');

    const existingAccount = await Customer.findOne({ email });
    if (existingAccount) return res.status(400).json('Email já existe');

    if (!password || password.length < 8) return res.status(400).json('Senha inválida');

    const newAccount = await new Customer({
      id,
      name,
      email,
      password,
    }).save();

    return res.status(201).json(newAccount);
  },
}

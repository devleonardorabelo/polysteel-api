import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

import Customer from '../models/Customer';

import treatEmail from '../utils/treatEmail';
import generateToken from './utils/generateToken';
import { CustomerType } from '../types';

export = {
  async signin(req: Request, res: Response) {
    const { email, password }: CustomerType = req.body;

    const emailTest: boolean = treatEmail(email);
    if (!emailTest) return res.status(400).json('Email Invalido');

    const account = await Customer.findOne({ email });
    if (!account) return res.status(400).json('Não existe uma conta com este email');

    if (!password || password.length < 8) return res.status(400).json('Senha inválida');
    if (!await bcrypt.compare(password, account.password)) return res.status(401).json('Senha incorreta');

    const jwtToken = generateToken(account);

    return res.status(200).json(jwtToken);
  },

  async signup(req: Request, res: Response) {
    const { name, email, password }: CustomerType = req.body;

    if (!name || name.length <= 3) return res.status(400).json('Nome inválido');

    const emailTest: boolean = treatEmail(email);
    if (!emailTest) return res.status(400).json('Email Invalido');

    const existingAccount = await Customer.findOne({ email });
    if (existingAccount) return res.status(400).json('Email já existe');

    if (!password || password.length < 8) return res.status(400).json('Senha inválida');

    const account = await new Customer({
      id: uuid(),
      name,
      email,
      password: await bcrypt.hash(password, 10),
      actived: false,
      recoveryCode: uuid(),
    }).save();

    const jwtToken = generateToken(account);

    return res.status(201).json(jwtToken);
  },

}

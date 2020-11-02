import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { Request, Response } from 'express';
import { CustomerType } from '../types';

import Customer from '../models/Customer';

import treatEmail from '../utils/treatEmail';
import generateToken from './utils/generateToken';
import sendMail from './utils/sendMail';

export = {
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

    sendMail({
      to: email,
      subject: 'Confirmação de cadastro',
      text: 'clique aqui e confirme',
    });

    return res.status(201).json(jwtToken);
  },
}

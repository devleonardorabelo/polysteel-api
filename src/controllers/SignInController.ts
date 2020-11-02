import bcrypt from 'bcryptjs';

import { Request, Response } from 'express';
import { CustomerType } from '../types';

import Customer from '../models/Customer';

import treatEmail from '../utils/treatEmail';
import generateToken from './utils/generateToken';

export = {
  async index(req: Request, res: Response) {
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
}

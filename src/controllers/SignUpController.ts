import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { Request, Response } from 'express';
import { CustomerType } from '../types';

import Customer from '../models/Customer';

import treatEmail from '../utils/treatEmail';
import generateToken from './utils/generateToken';
import sendMail from '../services/sendEmail';
import { treatCPF } from './utils/treatment';

export = {
  async store(req: Request, res: Response) {
    const { name, email, password }: CustomerType = req.body;

    if (!name || name.length <= 3) return res.status(400).json({ message: 'Nome inválido' });

    const emailTest: boolean = treatEmail(email);
    if (!emailTest) return res.status(400).json({ message: 'Email Invalido' });

    const existingAccount = await Customer.findOne({ email });
    if (existingAccount) return res.status(400).json({ message: 'Email já existe' });

    if (!password || password.length < 8) return res.status(400).json({ message: 'Senha inválida' });

    const account = await new Customer({
      customerID: uuid(),
      name,
      email,
      password: await bcrypt.hash(password, 10),
      actived: false,
      recoveryCode: uuid(),
    }).save();

    sendMail({
      title: 'Confirmar Cadastro',
      to: email,
      subject: 'Confirme o seu cadastro para acessar o site',
      html: `${process.env.BASEURL}/signup/confirm?customerID=${account.customerID}`,
    });

    return res.status(201).json({ message: 'Pré cadastro concluído. Confirme sua caixa de entrada e ative sua conta para continuar.' });
  },

  async update(req: Request, res: Response) {
    const { cpf, address, phone }: CustomerType = req.body;
    const { customerID }: CustomerType & any = req.query;

    const customer = await Customer.findOne({ customerID });
    if (!customer) return res.status(401).json({ message: 'Esta conta não existe' });
    if (customer.actived) return res.status(401).json({ message: 'Esta conta já está confirmada' });

    const CPFTest: boolean = treatCPF(cpf);
    if (!CPFTest) return res.status(400).json({ message: 'CPF inválido' });

    if (!address) return res.status(400).json({ message: 'Endereço inválido' });

    if (!phone || phone.length < 10) return res.status(400).json({ message: 'Telefone inválido' });

    await Customer.updateOne({ customerID }, {
      actived: true,
      cpf,
      address,
      phone,
    });

    const jwtToken = generateToken(customer);

    return res.status(201).json(jwtToken);
  },
}

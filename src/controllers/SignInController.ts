import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { Request, Response } from 'express';
import { CustomerType } from '../types';

import Customer from '../models/Customer';

import { treatEmail } from './utils/treatment';
import generateToken from './utils/generateToken';
import sendMail from '../services/sendEmail';

export = {
  async index(req: Request, res: Response) {
    const { email, password }: CustomerType = req.body;

    if (!email) return res.status(400).json({ message: 'Digite um e-mail' });
    const emailTest: boolean = treatEmail(email);
    if (!emailTest) return res.status(400).json({ message: 'Email Invalido' });

    const account = await Customer.findOne({ email });
    if (!account) return res.status(400).json({ message: 'Não existe uma conta com este email' });

    if (!password || password.length < 8) return res.status(400).json({ message: 'Senha inválida' });
    if (!await bcrypt.compare(password, account.password)) return res.status(401).json({ message: 'Senha incorreta' });

    const jwtToken = generateToken(account);

    return res.status(200).json(jwtToken);
  },
  async show(req: Request, res: Response) {
    const { email }: CustomerType = req.body;

    const recoveryCode = uuid();

    const account = await Customer.findOne({ email });
    if (!account) return res.status(400).json({ message: 'Não existe uma conta com este email.' });

    sendMail({
      title: 'Recuperação de senha',
      subject: 'E-mail para recuperação da sua senha ',
      to: account.email,
      html: `${process.env.BASEURL}/newpass?recoveryCode=${recoveryCode}`,
    });

    await Customer.updateOne({ email }, {
      recovery: {
        code: recoveryCode,
        date: new Date().getTime() + 3600000,
      },
    });

    return res.status(200).json({ message: 'Um e-mail foi enviado para que você recupere sua conta, confira a sua caixa de entrada.' });
  },
  async update(req: Request, res: Response) {
    const { password, confirmPassword }: { password: string, confirmPassword: string } = req.body;
    const { recoveryCode }: CustomerType & any = req.query;

    const dateNow = new Date().getTime();

    if (!password || !confirmPassword) return res.status(400).json('Senha inválida');
    if (password !== confirmPassword) return res.status(400).json('As senhas não são iguais');

    const account = await Customer.findOne({ 'recovery.code': recoveryCode });

    if (!account || !recoveryCode) return res.status(401).json('Código de recuperação inválido');
    if (account.recovery.date < dateNow) return res.status(401).json('Código de recuperação expirado');

    await Customer.updateOne({ customerID: account.customerID }, {
      password: await bcrypt.hash(password, 10),
      recovery: {
        code: uuid(),
        date: new Date().getTime() + 3600000,
      },
    });

    return res.status(200).json({ message: 'Você já pode logar com sua nova senha.' });
  },
}

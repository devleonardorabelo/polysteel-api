import jwt from 'jsonwebtoken';
import { CustomerType } from '../../types';

const generateToken = ({
  id, name, email, phone, cpf, address, actived,
}: CustomerType) => jwt.sign({
  id,
  name,
  email,
  phone,
  cpf,
  address,
  actived,
}, process.env.SECRET, { expiresIn: process.env.ACCESSEXPIRATION });

export default generateToken;

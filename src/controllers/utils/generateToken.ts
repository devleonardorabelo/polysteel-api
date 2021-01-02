import jwt from 'jsonwebtoken';
import { CustomerType } from '../../types';

const generateToken = ({
  customerID, name, email, phone, cpf, address, actived,
}: CustomerType) => jwt.sign({
  customerID,
  name,
  email,
  phone,
  cpf,
  address,
  actived,
}, process.env.SECRET);

export default generateToken;

import { Schema, model, Document } from 'mongoose';
import { CustomerType } from '../types';

const CustomerSchema: Schema = new Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  phone: String,
  cpf: String,
  address: {
    cep: String,
    city: String,
    street: String, // Endereço inicial
    additionalAddress: String, // Complemento
    neighborhood: String, // Bairro
    number: Number,
    state: String,
    referencePoint: String,
  },
  actived: Boolean,
  recoveryCode: String,
});

export default model<CustomerType & Document>('Customer', CustomerSchema);

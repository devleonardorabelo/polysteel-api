import { Schema, model } from 'mongoose';

const CustomerSchema = new Schema({
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
});

export default model('Customer', CustomerSchema);

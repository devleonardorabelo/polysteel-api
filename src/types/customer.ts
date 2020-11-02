export type CustomerType = {
  name: string,
  email: string,
  password: string,
  phone: string,
  cpf: string,
  address: {
    cep: string,
    city: string,
    street: string, // Endereço inicial
    additionalAddress: string, // Complemento
    neighborhood: string, // Bairro
    number: number,
    state: string,
    referencePoint: string,
  }
};

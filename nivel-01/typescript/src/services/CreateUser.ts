interface ITechObject {
  title: string,
  experiencia: number;
}

interface IUser {
  nome?: string,
  email: string,
  senha: string
  techs: Array<string | ITechObject>
}


export default function createUser({ nome, email, senha, techs } : IUser) {
  const user = {
    nome, email, senha
  }

  return user;
}
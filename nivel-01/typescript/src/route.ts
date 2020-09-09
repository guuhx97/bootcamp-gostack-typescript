import { Response,Request } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(req: Request, res: Response) {
  const user = createUser({
    nome:'Gustavo', 
    email: 'gustavo@gmail.com', 
    senha: '123456',
    techs: [
      'nodejs', 
      'reactjs', 
      'react-native', 
      { title: 'JS', experiencia: 100},
      { title: 'NodeJs', experiencia: 90}
    ]
  });

  console.log(user.senha)


  return res.json({message: 'Hello world'})
}
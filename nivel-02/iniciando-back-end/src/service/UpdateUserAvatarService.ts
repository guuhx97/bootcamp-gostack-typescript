import { getRepository } from 'typeorm';
import path from 'path';
import User from '../models/User';
import usersRouter from '../routes/users.routes';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<void> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    // if(user.avatar){
    //   const userAvatarFilePath =
    // }
  }
}

export default UpdateUserAvatarService;

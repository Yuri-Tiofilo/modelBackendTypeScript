import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userExist = await usersRepository.findOne({
      where: { email },
    });

    if (userExist) {
      throw new Error('User exists in database');
    }

    const user = usersRepository.create({
      email,
      name,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

import AppError from '@shared/errors/appError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

import IHashProvider from '../providers/hashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('User exists in database');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;

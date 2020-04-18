import { Response, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UserRepository from '../repositories/UserRepositories';

class UserController {
  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const userRepositories = getCustomRepository(UserRepository);

    const user = await userRepositories.findOne({
      where: { id },
    });

    if (!user) {
      res.status(401).json({ message: 'User not exist' });
    }

    // await userRepositories.delete();

    // return res.json(user);
  }
}

export default new UserController();

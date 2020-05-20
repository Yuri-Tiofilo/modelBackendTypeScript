import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const uploadUserAvatar = container.resolve(UpdateUserService);

    const user = await uploadUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}

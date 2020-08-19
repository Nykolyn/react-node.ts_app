import { NextFunction, Request, Response } from 'express';
import * as validator from 'express-validator';

import errorThrower from '../utils/errorThrower';
import UserServices from '../Services/UserServices';

class UserController {
  private userServices: UserServices = new UserServices();

  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        errorThrower({
          message: 'Validation failed, entered data is incorrect',
          status: 422,
          data: errors.array(),
        });
      }

      const { email, password } = req.body;

      const token = await this.userServices.signIn({ email, password });

      res.json({ message: 'Login success', token });
    } catch (e) {
      next(e);
    }
  };

  public signUp = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: 'Success' });
    } catch (e) {
      next(e);
    }
  };
}

export default UserController;

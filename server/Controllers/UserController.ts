import { NextFunction, Request, Response } from 'express';
import * as validator from 'express-validator';
import bcrypt from 'bcrypt';

import errorThrower from '../utils/errorThrower';
import UserServices from '../Services/UserServices';
import MailSender from '../utils/MailSender';
import { ISignUpUserData } from 'Interfaces';

interface IControllerFunc {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

class UserController {
  private userServices: UserServices = new UserServices();
  private mailSender: MailSender = new MailSender();

  private checkIncomingData(req: Request): void {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      errorThrower({
        message: 'Validation failed, entered data is incorrect',
        status: 422,
        data: errors.array(),
      });
    }
  }

  public signIn: IControllerFunc = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      this.checkIncomingData(req);
      const token = await this.userServices.signIn({ email, password });

      res.json({ message: 'Login success', token });
    } catch (e) {
      next(e);
    }
  };

  public signUp: IControllerFunc = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      this.checkIncomingData(req);

      const userData: ISignUpUserData = await this.userServices.signUp({ email, password });
      await this.mailSender.sendEmail({
        to: userData.user.email,
        subject: 'Test sending email',
        html: '<div>Success!</div>',
        onSuccess: () => res.json({ message: 'User created successfully. Check confirmation on your email' }),
        onError: () => {
          errorThrower({
            message: 'Sending email error.',
            status: 500,
          });
        },
      });
    } catch (e) {
      next(e);
    }
  };
}

export default UserController;

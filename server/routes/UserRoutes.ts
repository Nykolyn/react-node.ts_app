import { Router } from 'express';
import * as expressValidator from 'express-validator';

import UserController from '../Controllers/UserController';
import UserModel from '../Models/User';

class UserRoutes {
  public router: Router = Router();
  public userController: UserController = new UserController();
  public userValidationRules = [
    expressValidator
      .body('email')
      .trim()
      .isEmail()
      .custom(async (value) => {
        const user = await UserModel.findOne({ email: value });
        if (user) return Promise.reject('E-mail is already taken');

        return true;
      })
      .normalizeEmail(),
    expressValidator.body('password').trim().isLength({ min: 5, max: 16 }),
  ];

  constructor() {
    this.routes();
  }

  private routes() {
    this.router.post('/login', this.userValidationRules, this.userController.signIn);
    this.router.post('/register', this.userValidationRules, this.userController.signUp);
  }
}

export default UserRoutes;

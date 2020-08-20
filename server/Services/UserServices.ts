import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../Models/User';
import { IUser, ISignUpUserData } from '../Interfaces';
import errorThrower from '../utils/errorThrower';

const JWT_SECRET = process.env.JWT_SECRET;
interface IAuthServiceFunc {
  (userData: { email: string; password: string }): Promise<string | void>;
}

interface IAuthSignUpFunc {
  (userData: { email: string; password: string }): Promise<ISignUpUserData>;
}

class UserServices {
  private checkValidUser = async (email: string): Promise<IUser | null> => await User.findOne({ email });

  private comparePasswords = async (inputPassword: string, userPassword: string): Promise<boolean> =>
    await bcrypt.compare(inputPassword, userPassword);

  public signIn: IAuthServiceFunc = async (userData) => {
    try {
      const user = await this.checkValidUser(userData.email);
      if (!user) {
        errorThrower({ status: 401, message: 'No user found' });
        return;
      }

      const matchedPassword = await this.comparePasswords(userData.password, user.password);
      if (!matchedPassword) errorThrower({ status: 401, message: 'Wrong password.' });

      if (!process.env.JWT_SECRET) {
        console.log('JWT is missing');
        process.exit(1);
      }

      const token = jwt.sign({ email: userData.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });

      return token;
    } catch (e) {
      throw e;
    }
  };

  public signUp: IAuthSignUpFunc = async (userData) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      const newUser = new User({
        email: userData.email,
        password: hashedPassword,
      });

      await newUser.save();

      if (!JWT_SECRET) {
        console.log('JWT is missing');
        process.exit(1);
      }

      return { user: newUser, confirmToken: jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1w' }) };
    } catch (e) {
      throw e;
    }
  };
}

export default UserServices;

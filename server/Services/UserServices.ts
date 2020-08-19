import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../Models/User';
import errorThrower from '../utils/errorThrower';

class UserServices {
  public test = 1;
  public async signIn(userData: { password: string; email: string }): Promise<string | void> {
    try {
      const user = await User.findOne({ email: userData.email });
      if (!user) errorThrower({ status: 401, message: 'No user found' });

      if (!user) return;

      const matchedPassword = await bcrypt.compare(userData.password, user.password);
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
  }
}

export default UserServices;

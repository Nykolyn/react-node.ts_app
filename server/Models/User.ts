import mongoose, { Schema, Document } from 'mongoose';

import { IUser } from '../Interfaces';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SteamUser',
    },
  ],
});

export default mongoose.model<IUser>('User', userSchema);

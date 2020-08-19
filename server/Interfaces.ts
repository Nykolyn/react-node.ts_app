import { Document } from 'mongoose';

export interface ErrorRes {
  message: string;
  data?: object;
}

export interface IUser extends Document {
  email: string;
  password: string;
}

export interface ISteamUser extends Document {
  names: [string];
  favorite: boolean;
  creator: IUser['_id'];
  steamId: string;
}

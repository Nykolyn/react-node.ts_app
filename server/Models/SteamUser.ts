import mongoose, { Schema } from 'mongoose';

const steamUser: Schema = new mongoose.Schema({
  names: [
    {
      type: String,
      required: true,
    },
  ],
  steamId: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('SteamUser', steamUser);

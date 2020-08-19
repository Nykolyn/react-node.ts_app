import mongoose from 'mongoose';

const DB_HOST = process.env.DB_HOST;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

if (!DB_HOST || !DB_NAME || !DB_PASS) {
  console.log('No env variables to connect to Mongo');
  process.exit(1);
}

const connectToDB = async (reconnectData?: { socketTimeoutMS: number; connectTiomeoutMS: number }): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_HOST}:${DB_PASS}@collections-nhctb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ...reconnectData,
      }
    );
  } catch (error) {
    console.error('Error while connecting to db');
  }
};

export default connectToDB;

import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('mongoDB is already connected');
    return;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'share_prompt',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      isConnected = true;

      console.log('mongoDB is Connected');
    } catch (error) {
      console.error('mongoose connection error: \n', error.message);
    }
  }
};

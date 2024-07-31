// db.js
import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    // console.log(uri);
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


 
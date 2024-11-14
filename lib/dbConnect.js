import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    // If already connected, return the existing connection
    return;
  }
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default dbConnect;

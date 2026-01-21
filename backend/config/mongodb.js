import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/MernProject`)
}

export default connectDB

// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/MernProject`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     mongoose.connection.on('connected', () =>
//       console.log('✅ MongoDB connected successfully')
//     );

//     mongoose.connection.on('error', (err) =>
//       console.error('❌ MongoDB connection error:', err)
//     );
//   } catch (error) {
//     console.error('❌ Error connecting to MongoDB:', error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;

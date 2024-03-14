import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO);
        console.log(
            `Connected To MongoDB Database ${conn.connection.host}`
        );
    } catch (error) {
        console.log(`Error in MongoDB ${error}`);
    }
};

export default connectDB;

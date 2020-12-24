import mongoose from 'mongoose';

// Establish database connection
const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            poolSize: 10,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log(`MongoDb connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

export default connectDb;
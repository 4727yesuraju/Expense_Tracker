import mongoose from 'mongoose';

export default async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGODB_CONN_STR);
        console.log(`mongodb connected successfully :)`);
    } catch (error) {
        console.log(`Error in connecttoDB :(`);
        console.error(`${error.message}`);
    }
}
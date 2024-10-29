require('dotenv').config();
const mongoose = require('mongoose');

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected successfully to MongoDB with Mongoose');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}
module.exports = {connectToMongoDB};
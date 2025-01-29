const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connectDb = async () => {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
        console.error("Error: MongoDB connection string is not defined in the .env file.");
        process.exit(1);
    }

    try {
        const connect = await mongoose.connect(connectionString)
        console.log("MongoDB connected: ", connect.connection.host, connect.connection.name)
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
};

module.exports = connectDb;
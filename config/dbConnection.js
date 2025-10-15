const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Connected Successfully', conn.connection.host, conn.connection.name);
    } catch (err) {
        console.log(err)
        process.exit(1);
    }
}

module.exports = connectDB;
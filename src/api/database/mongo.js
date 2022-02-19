const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './src/config/config.env' });

const PATH = process.env.MONGO_URI;

module.exports = async () => {
    await mongoose.connect(PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return mongoose;
};


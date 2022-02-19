//Module imports
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './src/config/config.env' });
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors');

//Custom imports
const authRoute = require('./routes/user-routes/auth');
const userRoute = require('./routes/user-routes/user');
const productRoute = require('./routes/product-routes/product');
const cartRoute = require('./routes/product-routes/cart');
const orderRoute = require('./routes/product-routes/order');
const stripeRoute = require('./routes/payment-routes/stripe');

//Consts
const PORT = process.env.PORT || 5000;

//Base setup
const initBase = () => {
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

    let corsOptions = { origin: "*" };
    app.use(cors(corsOptions));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    console.log('base setup initialized');
};

//DB connection
const initDb = async () => {

};


//Routes
const initRoutes = async () => {
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/products", productRoute);
    app.use("/api/carts", cartRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/checkout", stripeRoute);
    console.log('routes initialized');
};

const start = async () => {
    try {
        initBase();
        initRoutes();
        app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode at http://www.localhost:${PORT}`));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();

const Order = require('../database/models/Order');

exports.getOrder = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {

            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            } finally {
                mongoose.connection.close();
            }
        });
    } catch (err) {
        //custom errorhandler
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getAllOrders = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {

            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            } finally {
                mongoose.connection.close();
            }
        });
    } catch (err) {
        //custom errorhandler
        console.log(err);
        res.status(500).json(err);
    }
};

exports.createOrder = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {

            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            } finally {
                mongoose.connection.close();
            }
        });
    } catch (err) {
        //custom errorhandler
        console.log(err);
        res.status(500).json(err);
    }
};

exports.updateOrder = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {

            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            } finally {
                mongoose.connection.close();
            }
        });
    } catch (err) {
        //custom errorhandler
        console.log(err);
        res.status(500).json(err);
    }
};

exports.deleteOrder = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {

            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            } finally {
                mongoose.connection.close();
            }
        });
    } catch (err) {
        //custom errorhandler
        console.log(err);
        res.status(500).json(err);
    }
};


exports.monthlyIncome = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {

            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            } finally {
                mongoose.connection.close();
            }
        });
    } catch (err) {
        //custom errorhandler
        console.log(err);
        res.status(500).json(err);
    }
};



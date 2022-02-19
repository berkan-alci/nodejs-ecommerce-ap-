const Cart = require('../database/models/Cart');

exports.getCart = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {
                const cart = await Cart.findOne({ userId: req.params.uid })
                res.status(200).json(cart);
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

exports.getAllCarts = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {
                const carts = await Cart.find();
                res.status(200).json(carts);
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

exports.createCart = async (req, res, next) => {
    const newCart = new Cart(req.body);

    try {
        await mongo().then(async (mongoose) => {
            try {
                const saved = await newCart.save();
                res.status(201).json(saved);
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

exports.deleteCart = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {
                await Cart.findByIdAndDelete(req.params.uid);
                res.status(204).json('Cart has been deleted');
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

exports.updateCart = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {
                const updated = await Cart.findByIdAndUpdate(
                    req.params.uid,
                    { $set: req.body },
                    { new: true }
                );
                res.status(201).json(updated);
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
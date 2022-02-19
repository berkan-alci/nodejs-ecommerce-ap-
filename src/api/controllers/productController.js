const Product = require('../database/models/Product');

exports.getProduct = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {
                const product = await Product.findById(req.params.id);
                res.status(200).json(product);
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

exports.getAllProducts = async (req, res, next) => {

    const q = req.query.new;
    const qCategory = req.query.category;
    try {
        await mongo().then(async (mongoose) => {
            try {
                let products;

                if (qNew) {
                    products = await Product.find().sort({ createdAt: -1 }).limit(1);
                } else if (qCategory) {
                    products = await Product.find({
                        categories: {
                            $in: [qCategory]
                        },
                    });
                } else {
                    products = await Product.find();
                }
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

exports.createProduct = async (req, res, next) => {

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

exports.updateProduct = async (req, res, next) => {

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

exports.deleteProduct = async (req, res, next) => {

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
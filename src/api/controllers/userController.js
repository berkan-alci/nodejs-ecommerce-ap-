const mongo = require('../database/mongo');
const User = require('../database/models/User');
const cryptoJS = require("crypto-js");

exports.getSingle = async (req, res, next) => {
    try {
        await mongo().then(async (mongoose) => {
            try {
                const user = await User.findById(req.params.id);
                const { password, ...others } = user._doc;
                res.status(200).json(others);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            } finally {
                mongoose.connection.close();
            }
        });
    } catch (err) {
        //Custom error handler
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getAll = async (req, res, next) => {
    const query = req.query.new;
    try {
        await mongo().then(async (mongoose) => {
            try {
                const users = query
                    ? await User.find().sort({ _id: -1 }).limit(5)
                    : await User.find();
                res.status(200).json(users);
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

exports.getStats = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        await mongo().then(async (mongoose) => {
            try {
                const data = await User.aggregate([
                    { $match: { createdAt: { $gte: lastYear } } },
                    {
                        $project: {
                            month: { $month: "$createdAt" },
                        },
                    },
                    {
                        $group: {
                            _id: "$month",
                            total: { $sum: 1 },
                        },
                    },
                ]);
                res.status(200).json(data)
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

exports.update = async (req, res, next) => {
    if (req.body.password) {
        req.body.password = cryptoJS.AES.encrypt(req.body.password, 'SecretKeyHere').toString();
    }
    try {
        await mongo().then(async (mongoose) => {
            try {
                const updated = await User.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body.password },
                    { new: true },
                )
                res.status(204).status(updated);
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

exports.delete = async (req, res, next) => {

    try {
        await mongo().then(async (mongoose) => {
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted!");
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
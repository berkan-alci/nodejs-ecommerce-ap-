const mongo = require('../database/mongo');
const User = require('../database/models/User');
const cryptoJS = require("crypto-js");
const { createToken } = require('../middleware/jwt');

exports.register = async (req, res, next) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            'SecretKeyHere').toString()
    });

    try {
        await mongo().then(async (mongoose) => {

            try {
                const saved = await user.save();
                return res.status(201).json(saved);
            } catch (err) {
                console.log(err);
            } finally {
                mongoose.connection.close();
            }

        });
    } catch (err) {
        //Custom error handler
        console.log(err);
        return res.json(500).json(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        let user = {};
        const username = { "username": req.body.username };
        await mongo().then(async (mongoose) => {
            try {
                const doc = await User.findOne(username);
                user = doc;
            } catch (err) {
                throw (err);
            } finally {
                mongoose.connection.close();
            }
        });

        !user && res.status(401).json('Wrong credentials');

        const hashedP = cryptoJS.AES.decrypt(user.password, 'SecretKeyHere');

        const pass = hashedP.toString(cryptoJS.enc.Utf8);
        const inputPass = req.body.password;

        pass != inputPass && res.status(401).json('Wrong credentials');

        await createToken(user._id, user._isSuper);

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });


    } catch (err) {
        //Custom error handler
        console.log(err);
        res.status(500).json(err);
    }
};

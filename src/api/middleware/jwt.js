const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, 'secret', (err, user) => {
            if (err) res.status(403).json("Invalid token!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("Not authenticated");
    }
};

const verifyTokenAndAuthorization = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isSuper) {
            next();
        } else {
            res.status(403).json("Not authorized to perform this action!");
        }
    });
};

const verifyTokenAndAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isSuper) {
            next();
        } else {
            res.status(403).json("Not authorized to perform this action!");
        }
    });
};

const createToken = async (id, isSuper) => {
    return accessToken = jwt.sign({ id, isSuper }, 'SecretHere', { expiresIn: "1d" });

};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    createToken,
};
async function errorLogger(error, req, res, next) {
    console.log('Error handling middleware');
    console.log('Path: ', req.path);
    console.log('Error: ', error);
    next(error);
};

async function errorResponder(error, req, res, next) {
    if (error.code === 11000) return res.status(409).send(error);
    else if (error.type == 'time-out') res.status(408).send(error)
    else next(error);
};

async function failSafeHandler(error, req, res, next) {
    res.status(500).send(error);
};

module.exports = {
    errorLogger,
    errorResponder,
    failSafeHandler,
};
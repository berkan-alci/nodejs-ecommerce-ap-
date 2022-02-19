const stripe = require("stripe")("stripe key here");

exports.payment((req, res, next) => {
    try {
        stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "eur",
        },
            (stripeErr, stripeRes) => {
                if (stripeErr) {
                    res.status(500).json(stripeErr)
                } else {
                    res.status(201).json(stripeRes);
                }
            }
        )
    } catch (err) {
        //custom errorhandler
        console.log(err)
        res.status(500).json(err);
    }

});
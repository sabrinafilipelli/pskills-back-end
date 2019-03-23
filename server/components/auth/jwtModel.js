require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'You\'re my little secret';

const generateToken = prison => {
    const payload = {
        subject: prison.id,
        location: prison.location
    }

    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(payload, secret, options);
}

const adminRoute = (req, res, next) => {
    const token = req.get('Authorization');

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return res.status(401).json(err);

            req.decoded = decoded;

            next();
        });
    } else {
        return res.status(401).json({
            error: 'No token provided, must be set on the Authorization Header',
        });
    }
}

module.exports = {
    generateToken,
    adminRoute
}
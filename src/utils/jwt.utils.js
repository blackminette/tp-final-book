const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generateJwt = async (data) => {
    const token = await jwt.sign(data, jwtSecret, { expiresIn: '24h' });
    return token;
}

const validateJwt = (token) => {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
}

module.exports = {
    generateJwt,
    validateJwt
}
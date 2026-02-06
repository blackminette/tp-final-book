const { validateJwt } = require("../utils/jwt.utils");

const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            message: "Le token est manquant.",
            statusCode: 401
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = validateJwt(token);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({
            error: true,
            message: "Le token est invalide ou a expiré.",
            statusCode: 403
        });
    }
}

module.exports = authenticateMiddleware;
const logger = (req, _res, next) => {
    const date = new Date().toLocaleString();
    console.log(`${date} | Méthode : ${req.method} | URL : ${req.url}`);
    next();
}

module.exports = logger;
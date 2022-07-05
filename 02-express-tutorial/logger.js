const logger = (req, res, next) => {            //Middleware: it works as an embeded function injects in methods
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next()
}

module.exports = logger;
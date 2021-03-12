module.exports = function (req, res, next) {

    if(!req.decoded.is_admin) return res.status(403).send('Access denied');

    next();
}
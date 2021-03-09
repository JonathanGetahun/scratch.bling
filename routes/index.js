const backScratchersAPI = require('./back_scratchers_api');

module.exports = (app) => {
    app.use('/list-all-backscratchers', backScratchersAPI);
};
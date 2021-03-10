const backScratchersAPI = require('./back_scratchers_api');
const createBackScratcher = require('../utils/uploadScratchers');

module.exports = (app) => {
    app.use('/upload', createBackScratcher),
    app.use('/api/v1/backscratchers', backScratchersAPI)
};
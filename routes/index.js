const backScratchersAPI = require('./back_scratchers_api');
const createBackScratcher = require('../utils/uploadScratchersTable');
const createUserTable = require('../utils/uploadUserTable');
const user = require('./users');

module.exports = (app) => {
    app.use('/uploadScratcher', createBackScratcher),
    app.use('/api/v1/backscratchers', backScratchersAPI),
    app.use('/uploadUserTable', createUserTable),
    app.use('/admin', user)
};
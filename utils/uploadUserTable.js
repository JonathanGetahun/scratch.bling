const logger = require('./logger');
const db = require('../db');
const { createUserTable } = require('../db/userQueries');

const Router = require('express-promise-router');
const router = new Router();

router.get('/', async(req,res) => {

    try{
        const newTable = await db.query(createUserTable);
        res.send(newTable);
    } catch(err){
        logger.error(err);
        res.send(err);
    }

});

module.exports = router;

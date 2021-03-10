const logger = require('./logger');
const db = require('../db');
const { create_back_scratchers, backScratcher_add } = require('../db/queries');

const Router = require('express-promise-router');
const router = new Router();

router.get('/data', async(req, res) => {
    //Could have mapped through entries and uploaded
    const data = await db.query(backScratcher_add, ["Glitz and Gold","Gold handle and fancy emeralds make this shine",
    ['XL','L','M','S'], "$4,343.00"])
        .then((res) => {
            logger.info(res)
        })
        .catch((err) => {
            logger.error(err)
        });

    res.send(data)
})


router.get('/', async(req,res) => {
    const newTable = await db.query(create_back_scratchers)
    .then((res) => {
        logger.info(res)
    })
    .catch(err => {
        logger.error(err)
    });

    res.send(newTable);
});

module.exports = router;

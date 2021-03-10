const Router = require('express-promise-router');
const router = new Router();
const Joi = require('joi');

const logger = require('../utils/logger');
const db = require('../db');
const { backscratchersList, 
        backScratcher_add,
        backScratcher_find,
        backScratcher_update,
        backScratcher_delete } = require('../db/queries');


/**
 * CRUD for backscratcher api
 */
router.get('/', (req,res) => {
    db.query(backscratchersList)
        .then((data) => res.status(200).send(data.rows))
        .catch(err => res.status(404).send(err))
})

router.post('/', (req,res) => {

    const { name, description, size, cost } = req.body;

    const { error } = validateScratcher(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    db.query(backScratcher_add, [name, description, size, cost])
        .then(() => res.status(201).send(req.body))
        .catch(err => res.status(404).send(err.detail))
    
})


router.put('/:name', async(req,res) => {

    const { name, description, size, cost } = req.body;
    try{
        const result = await db.query(backScratcher_find, [req.params.name]);
        if(result.rowCount === 0) return res.status(404).send('The backscratcher with the given name was not found.');
    } catch(err){
        logger.error(err)
    }
    


    const { error } = validateScratcher(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        await db.query(backScratcher_update, [name, description, size, cost, req.params.name]);
        res.status(201).send(req.body);
    } catch(err){
        res.status(400).send(err.detail);
    }
    
})

router.delete('/:name', async(req,res) => {

    const name = req.params.name;
    try{
        const result = await db.query(backScratcher_delete, [name]);
        if(result.rowCount === 0) return res.status(404).send('The backscratcher with the given name was not found.');
    } catch(err){
        logger.error(err)
    }  

    try {
        await db.query(backScratcher_delete, [name]);
        return res.status(200).json({
            status: `Deleted back scratcher: ${name}`
        });
    } catch(err){
        logger.error(err)
    }


})

function validateScratcher(scratcher){
    const schema = Joi.object({
        name: Joi.string().required(), 
        description: Joi.string().required(),
        size: Joi.array().min(1).required(),
        cost: Joi.string().required()
    });

    return schema.validate(scratcher);
}

module.exports = router;
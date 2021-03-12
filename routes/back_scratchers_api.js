const Router = require('express-promise-router');
const router = new Router();
const Joi = require('joi');
const _ = require('lodash');

const logger = require('../utils/logger');
const db = require('../db');
const { backscratchersList, 
        backScratcher_add,
        backScratcher_find,
        backScratcher_update,
        backScratcher_delete,
        backScratcher_get } = require('../db/queries');

const auth = require('../middleware/auth');

/**
 * CRUD for backscratcher api
 */
router.get('/:id', auth, (req,res) => {
    db.query(backScratcher_get, [req.params.id])
    .then((data) => res.status(200).set('Access-Control-Expose-Headers','x-total-count').header('x-total-count', `${data.rows.length}`).send(data.rows[0]))
    .catch(err => res.status(404).send(err))
})
 
router.get('/', (req,res) => {
    db.query(backscratchersList)
        .then((data) => res.status(200).set('Access-Control-Expose-Headers','x-total-count').header('x-total-count', `${data.rows.length}`).send(data.rows))
        .catch(err => res.status(404).send(err))
})

router.post('/', auth, (req,res) => {
    
    const { item_name, item_description, item_size, item_cost } = req.body;

    const { error } = validateScratcher(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    db.query(backScratcher_add, [item_name, item_description, item_size, item_cost])
        .then(() => res.status(201).send(req.body))
        .catch(err => res.status(404).send(err.detail))
    
})


router.put('/:id', auth, async(req,res) => {

    const { id, item_name, item_description, item_size, item_cost } = req.body;
    try{
        const result = await db.query(backScratcher_find, [req.params.id]);
        if(result.rowCount === 0) return res.status(404).send('The backscratcher with the given name was not found.');
    } catch(err){
        logger.error(err)
    }

    const validate = _.pick(req.body, ['item_name', 'item_description', 'item_size', 'item_cost']);

    const { error } = validateScratcher(validate);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        await db.query(backScratcher_update, [item_name, item_description, item_size, item_cost, id]);
        res.status(201).send(req.body);
    } catch(err){
        res.status(400).send(err.detail);
    }
    
})

router.delete('/:id', auth, async(req,res) => {

    const id = req.params.id;
    try{
        const result = await db.query(backScratcher_find, [id]);
        if(result.rowCount === 0) return res.status(404).send('The backscratcher with the given id was not found.');
    } catch(err){
        logger.error(err)
    }  

    try {
        await db.query(backScratcher_delete, [id]);
        return res.status(200).json({
            status: `Deleted back scratcher: ${id}`
        });
    } catch(err){
        logger.error(err)
    }


})

function validateScratcher(scratcher){
    const schema = Joi.object({
        item_name: Joi.string().required(), 
        item_description: Joi.string().required(),
        item_size: Joi.array().min(1).required(),
        item_cost: Joi.string().required()
    });

    return schema.validate(scratcher);
}

module.exports = router;
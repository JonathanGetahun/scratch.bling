require('dotenv').config();
const Router = require('express-promise-router');
const router = new Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const logger = require('../utils/logger');
const db = require('../db');
const { user_find,
        user_add,
        user_delete,
        getUserList,
        user_get,
        userId_find,
        user_update } = require('../db/userQueries');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/:id', [auth,admin], (req,res) => {

    db.query(user_get, [req.params.id])
    .then((data) => res.status(200).set('Access-Control-Expose-Headers','x-total-count').header('x-total-count', `${data.rows.length}`).send(data.rows[0]))
    .catch(err => res.status(404).send(err))

})
        
router.get('/', (req,res) => {
    db.query(getUserList)
        .then((data) => res.status(200).set('Access-Control-Expose-Headers','x-total-count').header('x-total-count', `${data.rows.length}`).send(data.rows))
        .catch(err => res.status(404).send(err))
})

router.post('/', [auth,admin], async(req,res) => {

    let { username, password, is_admin } = req.body;
    if(!is_admin) is_admin = false;

    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const result = await db.query(user_find, [username]);
        if(result.rowCount !== 0) return res.status(400).send('User is already registered.');
    } catch(err){
        logger.error(err);
    }
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const token = jwt.sign({username, is_admin}, process.env.JWTkey);

    try{
        await db.query(user_add, [username, passwordHash, is_admin]);
        res.status(200).header('auth', token).send(req.body);
    } catch(err){
        res.status(404).send(err.detail);
    } 
    
})

/**
 * For user logging in.
 */
router.post('/auth', async(req,res) => {

    const { username, password } = req.body;
 
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    try{
        const result = await db.query(user_find, [username]);
        if(result.rowCount === 0) return res.status(400).send('Invalid username or password.');
        
        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).send('Invalid username or password');

        const token = jwt.sign({username, is_admin:user.is_admin}, process.env.JWTkey);

        res.status(200).send(token)
    } catch(err){
        logger.error(err);
        res.status(500).send(err.detail)
    }  
})

router.put('/:id', [auth,admin], async(req,res) => {

    let { id, username, password, is_admin } = req.body;

    let changedPassword = false;
    try{
        const result = await db.query(userId_find, [req.params.id]);
        if(result.rowCount === 0) return res.status(404).send('The backscratcher with the given name was not found.');
        const user = result.rows[0];
        changedPassword = await bcrypt.compare(password, user.password);
        if(!changedPassword) {
            const saltRounds = 10;
            var passwordHash = await bcrypt.hash(password, saltRounds);
        }  
    } catch(err){
        logger.error(err)
    }

    const validate = _.pick(req.body, ['username', 'password', 'is_admin']);

    const { error } = validateUser(validate);
    if(error) return res.status(400).send(error.details[0].message);

    if(passwordHash) password = passwordHash;

    try {
        await db.query(user_update, [username, password, is_admin, id]);
        res.status(201).send(req.body);
    } catch(err){
        res.status(400).send(err.detail);
    }
    
})

router.delete('/:id', [auth,admin], async(req,res) => {

    const id = req.params.id;

    try{
        const result = await db.query(userId_find, [id]);
        if(result.rowCount === 0) return res.status(404).send('The user with the given id was not found.');
    } catch(err){
        logger.error(err)
    }  

    try {
        await db.query(user_delete, [id]);
        return res.status(200).json({
            status: `Deleted back scratcher: ${id}`
        });
    } catch(err){
        logger.error(err)
    }


})

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().required(), 
        password: Joi.string().required().min(1),
        is_admin: Joi.boolean()
    });

    return schema.validate(user);
}


module.exports = router;
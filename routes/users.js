require('dotenv').config();
const Router = require('express-promise-router');
const router = new Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require('../utils/logger');
const db = require('../db');
const { user_find,
        user_add,
        user_delete } = require('../db/userQueries');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

        
router.get('/', (req,res) => {
    db.query(backscratchersList)
        .then((data) => res.status(200).send(data.rows))
        .catch(err => res.status(404).send(err))
})

router.post('/create', async(req,res) => {

    const { username, password, is_admin } = req.body;

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
        res.status(200).header('x-auth-token', token).send("User added successfully!");
    } catch(err){
        res.status(404).send(err.detail);
    } 
    
})

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

        res.send(token)
    } catch(err){
        logger.error(err);
        res.status(500).send(err.detail)
    }  
})

router.delete('/:name', [auth,admin], async(req,res) => {

    const name = req.params.name;

    try{
        const result = await db.query(user_find, [name]);
        if(result.rowCount === 0) return res.status(404).send('The user with the given username was not found.');
    } catch(err){
        logger.error(err)
    }  

    try {
        await db.query(user_delete, [name]);
        return res.status(200).json({
            status: `Deleted back scratcher: ${name}`
        });
    } catch(err){
        logger.error(err)
    }


})

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().required(), 
        password: Joi.string().required().min(4),
        is_admin: Joi.boolean()
    });

    return schema.validate(user);
}

module.exports = router;
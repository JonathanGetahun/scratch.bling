require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const logger = require('./utils/logger');
const mountRoutes = require('./routes');

if(!process.env.JWTkey){
    logger.error('FATAL ERROR: JWTkey is not defined.');
    process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

mountRoutes(app);


app.get('/', (req,res) => {
    res.send('Heres jonnyyy')
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    logger.info(`connection established on port: ${port}`);
})
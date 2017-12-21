const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
moment.locale('pt-br');

global.SECRET = 'GabrielCampos';

const ioMiddleware = require('./middlewares/ioMiddleware');
const routerMiddleware = require('./middlewares/routerMiddleware');

const app = express();


let url;
if (process.env.VILAR_MONGO_URL && process.env.VILAR_DATABASE){
    url = process.env.VILAR_MONGO_URL + process.env.VILAR_DATABASE;
}else{
    url = 'mongodb://127.0.0.1/vilar-demolay'
}

mongoose.connect(url);

ioMiddleware.set(app);
routerMiddleware.set(app);

const porta = process.env.API_VILAR_DEMOLAY_PORT || 5002;
app.listen(porta, ()=>{
    console.log('Servidor escutando na porta ' + porta + ' - Data: ' + moment().format('DD/MM/YYYY HH:MM:SS'));
});
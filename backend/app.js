const express = require('express');
const app = express(); 
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dataRouters = require('./dataRouters');
const puerto = 8080;

app.use(express.json());
app.use(cors());
app.use('/', dataRouters);

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

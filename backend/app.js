const express = require('express');
const app = express(); 
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dataRouters = require('./dataRouters');
const PORT = process.env.PORT || 8080; // Usa el puerto proporcionado por Render o 8080 como valor por defecto
const bcrypt = require('bcryptjs');

app.use(express.json());
app.use(cors());
app.use('/', dataRouters);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

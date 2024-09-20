const express = require('express');
const app = express(); 
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dataRouters = require('./dataRouters');
const PORT = process.env.PORT || 8080; // Usa el puerto proporcionado por Render o 8080 como valor por defecto
const bcrypt = require('bcryptjs');

app.use(express.json());
app.use(cors({
    origin: 'https://tu-frontend.vercel.app', // Reemplaza con la URL de tu frontend en Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Puedes restringir los métodos permitidos
    credentials: true // Si necesitas compartir cookies o información de autenticación
}));
app.use('/', dataRouters);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

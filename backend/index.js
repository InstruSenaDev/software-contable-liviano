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
  origin: 'https://provisoft-y0zr65fe1-luisibarguens-projects.vercel.app', // Cambia esto al origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true// La URL exacta de tu frontend
})); app.use('/', dataRouters);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

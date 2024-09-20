const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dataRouters = require('./dataRouters');
const PORT = process.env.PORT || 8080;
const bcrypt = require('bcryptjs');

app.use(express.json());

const allowedOrigins = [
  'https://provisoft-y0zr65fe1-luisibarguens-projects.vercel.app',
  'https://provisoft.vercel.app',
  'http://localhost:4321'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, origin);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/', dataRouters);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const cors = require('cors');
const dataRouters = require('./dataRouters');
const puerto = 3000;

app.use(express.json());
app.use(cors());
app.use('/', dataRouters);

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

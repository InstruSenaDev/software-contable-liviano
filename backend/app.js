const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const dataRouters = require('./dataRouters');
const cors = require('cors');
const puerto = 3000;

const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml','utf-8'));
// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use('/', dataRouters);

app.listen(puerto, () => {
    console.log(`Servidor escuchando en  http://localhost:${puerto}`);
})

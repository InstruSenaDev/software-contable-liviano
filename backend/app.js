const express = require("express");
const app = express();
const swaggerUi = require('swaggwer-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const dataRouters = require('./dataRouters');
const cors = require('cors');

const swaggwerDocument = yaml.load(fs.readFileSync('./'))

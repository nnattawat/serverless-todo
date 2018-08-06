const bodyParser = require('body-parser');
const express = require('express');
const serverless = require('serverless-http');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json({ strict: false }));

app.use(routes);

module.exports.handler = serverless(app);

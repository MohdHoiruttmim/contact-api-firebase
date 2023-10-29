const express = require('express');
const publicRouter = require('../route/public-api');
const errorMiddleware = require('../middleware/error-middleware');

const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);

module.exports = web;

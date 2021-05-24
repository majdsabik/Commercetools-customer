const express = require('express');
const CustomerController = require('./CustomerController');

const Controller = new CustomerController();
const routes = express.Router();

routes.get('/customers/', Controller.list);
routes.get('/customers/:id', Controller.show);
routes.post('/customers/', Controller.create);
routes.post('/login', Controller.login);
routes.post('/customers/:id', Controller.update);
routes.delete('/customers/:id', Controller.delete);

module.exports = routes;

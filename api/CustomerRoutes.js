const express = require('express');
const CustomerController = require('./CustomerController');

const Controller = new CustomerController();
const routes = express.Router();

routes.get('/', Controller.list);
routes.get('/:id', Controller.show);
routes.post('/', Controller.create);
routes.post('/:id', Controller.update);
routes.delete('/:id', Controller.delete);

module.exports = routes;

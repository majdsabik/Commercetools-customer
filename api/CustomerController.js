/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
const { listCustomers, showCustomer, createCustomer, login, updateCustomer, deleteCustomer } = require('./CustomerRepository');

class CustomerController {
  async list(_req, res) {
    try {
      const result = await listCustomers();
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const result = await showCustomer(id);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async create(req, res) {
    try {
      const customer = req.body;
      const result = await createCustomer(customer);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async login(req, res) {
    try {
      const customer = req.body;
      const result = await login(customer);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const customer = req.body;
      const result = await updateCustomer(id, customer);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const { version } = req.query;
      const result = await deleteCustomer(id, version);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = CustomerController;

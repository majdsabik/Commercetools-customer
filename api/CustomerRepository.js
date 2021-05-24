const axiosAPI = require('./axiosAPI');

const listCustomers = async () => {
  const customers = await axiosAPI.get('/msitutorial/customers/');
  return customers;
};

const showCustomer = async (id) => {
  const customer = await axiosAPI.get(`/msitutorial/customers/${id}`);
  return customer;
};

const createCustomer = async (customer) => {
  const result = await axiosAPI.post('/msitutorial/customers/', customer);
  return result;
};

const login = async (customer) => {
  const result = await axiosAPI.post('/msitutorial/login/', customer);
  return result;
};

const updateCustomer = async (id, customer) => {
  const result = await axiosAPI.post(`/msitutorial/customers/${id}`, customer);
  return result;
};

const deleteCustomer = async (id, version) => {
  const result = await axiosAPI.delete(`/msitutorial/customers/${id}`, { params: { version } });
  return result;
};

module.exports = {
  listCustomers,
  showCustomer,
  createCustomer,
  login,
  updateCustomer,
  deleteCustomer,
};

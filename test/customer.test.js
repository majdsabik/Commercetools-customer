/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
require('../app');
const nock = require('nock');
// eslint-disable-next-line object-curly-newline
const { listCustomers, showCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../api/CustomerRepository');
const listResponse = require('./listResponse.json');
const showResponse = require('./showResponse.json');
const createResponse = require('./createResponse.json');
const updateResponse = require('./updateResponse.json');
const deleteResponse = require('./deleteResponse.json');

describe('Customer CRUD operations:', () => {
  before(() => {
    nock.disableNetConnect();
  });

  after(() => {
    nock.enableNetConnect();
  });

  it('List all customers.', async () => {
    nock('https://api.europe-west1.gcp.commercetools.com/').get('/msitutorial/customers/').reply(200, listResponse);
    const list = await listCustomers();
    expect(list.data).to.have.property('results').that.is.an('array');
    expect(list.data).to.deep.equal(listResponse);
    expect(list.status).to.equal(200);
  });

  it('Show a specific customer.', async () => {
    const id = '1f8ef24b-9aa7-4606-990d-07349364f47b';
    nock('https://api.europe-west1.gcp.commercetools.com/').get(`/msitutorial/customers/${id}`).reply(200, showResponse);
    const customer = await showCustomer(id);
    expect(customer.data).to.have.property('firstName').that.is.a('string');
    expect(customer.data).to.deep.equal(showResponse);
    expect(customer.status).to.equal(200);
  });

  it('Create a new customer.', async () => {
    const customer = {
      email: 'customerMail@mail.com',
      password: 'customerPassword',
    };
    nock('https://api.europe-west1.gcp.commercetools.com/').post('/msitutorial/customers/').reply(200, createResponse);
    const response = await createCustomer(customer);
    expect(response.data.customer).to.have.property('email').that.is.a('string').equal('customerMail@mail.com');
    expect(response.data).to.deep.equal(createResponse);
    expect(response.status).to.equal(200);
  });

  it('Update a specific customer.', async () => {
    const id = '1f8ef24b-9aa7-4606-990d-07349364f47b';
    const request = {
      version: 1,
      actions: [
        {
          action: 'changeEmail',
          email: 'customerName@mail.com',
        },
        {
          action: 'setFirstName',
          firstName: 'Fname',
        },
        {
          action: 'setLastName',
          lastName: 'Lname',
        },
      ],
    };
    nock('https://api.europe-west1.gcp.commercetools.com/').post(`/msitutorial/customers/${id}`).reply(200, updateResponse);
    const response = await updateCustomer(id, request);
    expect(response.data).to.have.property('email').that.is.a('string').equal('customerName@mail.com');
    expect(response.data).to.deep.equal(updateResponse);
    expect(response.status).to.equal(200);
  });

  it('Delete a specific customer.', async () => {
    const id = '1f8ef24b-9aa7-4606-990d-07349364f47b';
    const version = 1;
    nock('https://api.europe-west1.gcp.commercetools.com/').delete(`/msitutorial/customers/${id}`).query({ version: 1 }).reply(200, deleteResponse);
    const response = await deleteCustomer(id, version);
    expect(response.data).to.have.property('email').that.is.a('string').equal('customerName@mail.com');
    expect(response.data).to.deep.equal(deleteResponse);
    expect(response.status).to.equal(200);
  });
});

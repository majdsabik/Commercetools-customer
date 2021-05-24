require('dotenv').config();
const express = require('express');
const Cors = require('cors');

const app = express();
const CustomerRoutes = require('./api/CustomerRoutes');

app.use(Cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CustomerRoutes);

// Handle errors
app.use((err, _req, res) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server started');
});

module.exports = app;

// app.js
require('dotenv').config();
const express = require('express');
const EmployeeRoutes = require('./routes/v1/EmployeeRoutes');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ALLOW_ORIGIN || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', EmployeeRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

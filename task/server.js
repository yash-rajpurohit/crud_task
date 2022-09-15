const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes')
const connectdb = require('./configuration/dbconfiguration')
const configuration_variables = require('./configuration/variables');

const app = express();

// database configuration function
connectdb();

// This method returns the middleware that only parses JSON
app.use(express.json());

// employee routes 
app.use('/api/employee', employeeRoutes)

app.get('*', (req, res) => {
    res.status(404).send('page not found');
})

app.listen(configuration_variables.PORT, () => {
    console.log(`server is running on port ${configuration_variables.PORT}`);
})
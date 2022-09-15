const mongoose = require('mongoose');
const configuration_variables = require('./variables')

const connectdb = async () => {
    // function to connect to mongodb server
    await mongoose.connect(configuration_variables.DBURL, { useNewUrlParser: true })
    .then(() => {
        console.log('database connected successfully');
    })
    .catch((error) => {
        console.log(error);
    })
}

module.exports = connectdb;
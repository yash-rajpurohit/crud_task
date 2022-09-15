const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    dob: {
        type: String,
        default: ''
    },
    department: {
        type: String,
        default: ''
    },
    basicSalary: {
        type: Number,
        default: 0
    },
    designation: {
        type: String,
        default: ''
    }
})

employeeSchema.index({ firstName: 'text'});

const employee = mongoose.model('employee', employeeSchema);

module.exports = employee;
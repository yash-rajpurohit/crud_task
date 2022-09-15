const express = require('express');
const {
    listemployee,
    searchemployee,
    createemployee,
    editemployee,
    deleteemployee
} = require('../controller/employeeController');
const router = express.Router();

router.get('/', searchemployee)
      .get('/all', listemployee)
      .post('/', createemployee)
      .put('/:id', editemployee)
      .delete('/:id', deleteemployee);


  module.exports = router















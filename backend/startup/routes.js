const express = require('express');
const tasks = require('../routes/tasks');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/tasks', tasks);
  app.use(error);
}
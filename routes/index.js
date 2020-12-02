const express = require('express');
const router = express.Router();
const { projectsHome, us } = require('../controllers/projectsController');

module.exports = () => {
  // Route: Home
  router.get('/', projectsHome)
  return router;
}
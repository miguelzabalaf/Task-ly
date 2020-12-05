const express = require('express');
const router = express.Router();
const { projectsHome, formNewPRoject, newPRoject } = require('../controllers/projectsController');

module.exports = () => {
  // Route: Home
  router.get('/', projectsHome);
  // Route: New Project
  router.get('/new-project', formNewPRoject);
  router.post('/new-project', newPRoject);
  return router;
}
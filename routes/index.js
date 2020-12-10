const express = require('express');
const router = express.Router();
const { projectsHome, formNewPRoject, newPRoject, projectByUrl, projectEditById, editPRoject, deleteProjectByUrl } = require('../controllers/projectsController');

// import Express-Validator
const { body } = require('express-validator/check')


module.exports = () => {
  // Route: Home
  router.get('/', projectsHome);

  // Route: New Project
  router.get('/new-project', formNewPRoject);
  router.post('/new-project',
    body('projectName').not().isEmpty().trim().escape(),
    newPRoject);

  // Show Project
  router.get('/projects/:url', projectByUrl);

  // Update Project
  router.get('/project/edit/:id', projectEditById);
  router.post('/new-project/:id',
    body('projectName').not().isEmpty().trim().escape(),
    editPRoject);

  // Delete Project
  router.delete('/projects/:url', deleteProjectByUrl)

  return router;
}
// Imports models
const Projects = require("../models/Projects");

// Home : GET
exports.projectsHome = async (req, resp) => {
  // Find all projects
  const projects = await Projects.findAll();

  resp.render('index', {
    titlePage: 'Home',
    projects // Pass the results to view
  });
}

// New Project: GET
exports.formNewPRoject = async (req, resp) => {
  // Find all projects
  const projects = await Projects.findAll();
  resp.render('new-project', {
    titlePage: 'New Project',
    projects
  });
}

// New Project: POST
exports.newPRoject = async (req, resp) => {
  // Send to the console what the user types
  console.log(req.body);
  // console.log(req.body);

  // Validate inputs
  const { projectName, description } = req.body;

  let errors = [];

  if (!projectName) {
    errors.push({ 'text': 'Add a name to the project' })
  }

  if (errors.length > 0) {
    resp.render('new-project', {
      titlePage: 'New Project',
      errors
    })
  } else {
    // Inser to DB
    const project = await Projects.create({ name: projectName, description: description });
    // Navigate to '/' after project insert in to DB
    resp.redirect('/')
  }

}

// Show Project by URL
exports.projectByUrl = async (req, resp, next) => {
  // Find all projects
  const projects = await Projects.findAll();
  const param = req.params.url
  const project = await Projects.findOne({
    where: {
      url: param
    }
  })

  if (!project) return next();

  // Render Vista
  resp.render('project', {
    titlePage: `${project.name}`,
    project,
    projects
  })
  // console.log('project find', project);
}
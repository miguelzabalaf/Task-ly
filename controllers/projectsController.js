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
  const projects = await Projects.findAll();
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
      errors,
      projects
    })
  } else {
    // Inser to DB
    const project = await Projects.create({ name: projectName, description: description });
    // Navigate to '/' after project insert in to DB
    resp.redirect(`/projects/${project.url}`)
  }

}

// Show Project by URL
exports.projectByUrl = async (req, resp, next) => {
  const param = req.params.url

  const projectsPRomise = Projects.findAll();

  const projectPromise = Projects.findOne({
    where: {
      url: param
    }
  })

  const [projects, project] = await Promise.all([projectsPRomise, projectPromise])

  if (!project) return next();

  // Render Vista
  resp.render('project', {
    titlePage: `${project.name}`,
    project,
    projects
  })
  // console.log('project find', project);
}

// Edit Project by ID
exports.projectEditById = async (req, resp, next) => {

  const param = req.params.id

  const projectsPRomise = Projects.findAll();

  const projectPromise = Projects.findOne({
    where: {
      id: param
    }
  })

  const [projects, project] = await Promise.all([projectsPRomise, projectPromise])


  resp.render('new-project', {
    titlePage: `Edit Project: ${project.name}`,
    project,
    projects,
    edit: true
  })
}

// New Project: POST
exports.editPRoject = async (req, resp) => {

  const param = req.params.id

  const projectsPRomise = Projects.findAll();

  const projectPromise = Projects.findOne({
    where: {
      id: param
    }
  })

  const [projects, project] = await Promise.all([projectsPRomise, projectPromise])

  const { projectName, description } = req.body;

  let errors = [];

  if (!projectName) {
    errors.push({ 'text': 'Add a name to the project' })
  }

  if (errors.length > 0) {
    resp.render('new-project', {
      titlePage: 'New Project',
      errors,
      projects
    })
  } else {
    // Update in DB
    await Projects.update(
      { name: projectName, description: description },
      { where: { id: param } }
    );
    // Navigate to '/' after project insert in to DB
    resp.redirect(`/projects/${project.url}`)
  }

}

// Delete PRoject: POST
exports.deleteProjectByUrl = async (req, resp, next) => {
  // console.log(req);
  // console.log(req.params);
  // console.log(req.query);
  const { urlProject } = req.query;
  const result = await Projects.destroy({ where: { url: urlProject } });

  if (!result) {
    return next();
  }

  resp.status(200).send('Project removed successfully.');
}
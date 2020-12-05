// Imports models
const Projects = require("../models/Projects");

// Home : GET
exports.projectsHome = (req, resp) => {
  resp.render('index', {
    titlePage: 'Home'
  });
}

// New Project: GET
exports.formNewPRoject = (req, resp) => {
  resp.render('new-project', {
    titlePage: 'New Project'
  });
}

// New Project: POST
exports.newPRoject = (req, resp) => {
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
    Projects.create({ name: projectName, description: description })
      .then(() => console.log('Se ha guardado Exitosamente el registro'))
      .catch((err) => console.log(err))
  }

}
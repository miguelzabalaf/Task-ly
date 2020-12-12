const Projects = require("../models/Projects");
const Tasks = require("../models/Tasks");

// New task by URL
exports.newTaskByUrl = async (req, resp, next) => {
  // Catch the actual project
  const project = await Projects.findOne({ where: { url: req.params.url } });

  // Read the inputs value
  const { task, task_description } = req.body;
  // console.log(task, task_description);

  // State incomplete
  const state = 0;

  // ProjectId
  const projectId = project.id

  // Create Task
  const result = await Tasks.create({ task, task_description, state, projectId })

  if (!result) {
    return next();
  }

  resp.redirect(`/projects/${req.params.url}`)
}

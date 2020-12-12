const Sequelize = require('sequelize');
const db = require('../config/db');
const Projects = require('./Projects');

const Tasks = db.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  task: Sequelize.STRING,
  task_description: Sequelize.STRING,
  state: Sequelize.INTEGER(1)
});

Tasks.belongsTo(Projects);
// Each task belongs to a project

module.exports = Tasks;
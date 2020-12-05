const Sequelize = require('sequelize');

const db = require('../config/db');

const Projects = db.define('projects', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "The name of project is required" }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: true,
  }

});

module.exports = Projects;
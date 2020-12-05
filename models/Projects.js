const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

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
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: true,
  }

}, {
  hooks: {
    beforeCreate(project) {
      // Befor to insert into daba base
      const url = slug(project.name);
      project.url = `${url}-${shortid.generate()}`;
    }
  }
});

module.exports = Projects;
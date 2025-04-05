
const applications = require("../models/applications.model");

module.exports = {
  getAll: (req, res) => {
    applications.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    applications.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const applications = req.body;
    applications.insert(applications, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const applications = req.body;
    const id = req.params.id;
    applications.update(applications, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    applications.delete(id, (result) => {
      res.send(result);
    });
  },
};

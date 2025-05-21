
const cv_templates = require("../models/cv_templates.model");

module.exports = {
  getAll: (req, res) => {
    cv_templates.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    cv_templates.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const cv_templates = req.body;
    cv_templates.insert(cv_templates, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const cv_templates = req.body;
    const id = req.params.id;
    cv_templates.update(cv_templates, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    cv_templates.delete(id, (result) => {
      res.send(result);
    });
  },
};

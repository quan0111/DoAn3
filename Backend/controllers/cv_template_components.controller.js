
const cv_template_components = require("../models/cv_template_components.model");

module.exports = {
  getAll: (req, res) => {
    cv_template_components.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    cv_template_components.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const cv_template_components = req.body;
    cv_template_components.insert(cv_template_components, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const cv_template_components = req.body;
    const id = req.params.id;
    cv_template_components.update(cv_template_components, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    cv_template_components.delete(id, (result) => {
      res.send(result);
    });
  },
};

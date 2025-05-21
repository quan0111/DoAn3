
const cv_template_categories = require("../models/cv_template_categories.model");

module.exports = {
  getAll: (req, res) => {
    cv_template_categories.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    cv_template_categories.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const cv_template_categories = req.body;
    cv_template_categories.insert(cv_template_categories, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const cv_template_categories = req.body;
    const id = req.params.id;
    cv_template_categories.update(cv_template_categories, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    cv_template_categories.delete(id, (result) => {
      res.send(result);
    });
  },
};

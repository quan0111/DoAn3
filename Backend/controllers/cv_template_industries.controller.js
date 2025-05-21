
const cv_template_industries = require("../models/cv_template_industries.model");

module.exports = {
  getAll: (req, res) => {
    cv_template_industries.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    cv_template_industries.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const cv_template_industries = req.body;
    cv_template_industries.insert(cv_template_industries, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const cv_template_industries = req.body;
    const id = req.params.id;
    cv_template_industries.update(cv_template_industries, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    cv_template_industries.delete(id, (result) => {
      res.send(result);
    });
  },
};

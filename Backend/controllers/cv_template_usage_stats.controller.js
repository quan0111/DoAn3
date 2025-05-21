
const cv_template_usage_stats = require("../models/cv_template_usage_stats.model");

module.exports = {
  getAll: (req, res) => {
    cv_template_usage_stats.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    cv_template_usage_stats.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const cv_template_usage_stats = req.body;
    cv_template_usage_stats.insert(cv_template_usage_stats, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const cv_template_usage_stats = req.body;
    const id = req.params.id;
    cv_template_usage_stats.update(cv_template_usage_stats, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    cv_template_usage_stats.delete(id, (result) => {
      res.send(result);
    });
  },
};

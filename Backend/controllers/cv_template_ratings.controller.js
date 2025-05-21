
const cv_template_ratings = require("../models/cv_template_ratings.model");

module.exports = {
  getAll: (req, res) => {
    cv_template_ratings.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    cv_template_ratings.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const cv_template_ratings = req.body;
    cv_template_ratings.insert(cv_template_ratings, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const cv_template_ratings = req.body;
    const id = req.params.id;
    cv_template_ratings.update(cv_template_ratings, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    cv_template_ratings.delete(id, (result) => {
      res.send(result);
    });
  },
};

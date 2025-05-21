
const user_cv_templates = require("../models/user_cv_templates.model");

module.exports = {
  getAll: (req, res) => {
    user_cv_templates.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    user_cv_templates.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const user_cv_templates = req.body;
    user_cv_templates.insert(user_cv_templates, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const user_cv_templates = req.body;
    const id = req.params.id;
    user_cv_templates.update(user_cv_templates, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    user_cv_templates.delete(id, (result) => {
      res.send(result);
    });
  },
};

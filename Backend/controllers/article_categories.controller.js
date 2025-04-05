
const article_categories = require("../models/article_categories.model");

module.exports = {
  getAll: (req, res) => {
    article_categories.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    article_categories.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const article_categories = req.body;
    article_categories.insert(article_categories, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const article_categories = req.body;
    const id = req.params.id;
    article_categories.update(article_categories, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    article_categories.delete(id, (result) => {
      res.send(result);
    });
  },
};

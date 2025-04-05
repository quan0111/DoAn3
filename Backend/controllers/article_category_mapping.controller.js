
const article_category_mapping = require("../models/article_category_mapping.model");

module.exports = {
  getAll: (req, res) => {
    article_category_mapping.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    article_category_mapping.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const article_category_mapping = req.body;
    article_category_mapping.insert(article_category_mapping, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const article_category_mapping = req.body;
    const id = req.params.id;
    article_category_mapping.update(article_category_mapping, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    article_category_mapping.delete(id, (result) => {
      res.send(result);
    });
  },
};

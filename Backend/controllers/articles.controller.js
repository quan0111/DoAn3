
const articles = require("../models/articles.model");

module.exports = {
  getAll: (req, res) => {
    articles.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    articles.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const articles = req.body;
    articles.insert(articles, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const articles = req.body;
    const id = req.params.id;
    articles.update(articles, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    articles.delete(id, (result) => {
      res.send(result);
    });
  },
};

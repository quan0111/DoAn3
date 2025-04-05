
const feedbacks = require("../models/feedbacks.model");

module.exports = {
  getAll: (req, res) => {
    feedbacks.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    feedbacks.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const feedbacks = req.body;
    feedbacks.insert(feedbacks, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const feedbacks = req.body;
    const id = req.params.id;
    feedbacks.update(feedbacks, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    feedbacks.delete(id, (result) => {
      res.send(result);
    });
  },
};

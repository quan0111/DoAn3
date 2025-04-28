
const ai_queries = require("../models/ai_queries.model");

module.exports = {
  getAll: (req, res) => {
    ai_queries.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    ai_queries.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const ai_queries = req.body;
    ai_queries.insert(ai_queries, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const ai_queries = req.body;
    const id = req.params.id;
    ai_queries.update(ai_queries, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    ai_queries.delete(id, (result) => {
      res.send(result);
    });
  },
};

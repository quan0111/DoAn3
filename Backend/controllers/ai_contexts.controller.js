
const ai_contexts = require("../models/ai_contexts.model");

module.exports = {
  getAll: (req, res) => {
    ai_contexts.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    ai_contexts.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const ai_contexts = req.body;
    ai_contexts.insert(ai_contexts, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const ai_contexts = req.body;
    const id = req.params.id;
    ai_contexts.update(ai_contexts, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    ai_contexts.delete(id, (result) => {
      res.send(result);
    });
  },
};

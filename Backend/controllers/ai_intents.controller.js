
const ai_intents = require("../models/ai_intents.model");

module.exports = {
  getAll: (req, res) => {
    ai_intents.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    ai_intents.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const ai_intents = req.body;
    ai_intents.insert(ai_intents, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const ai_intents = req.body;
    const id = req.params.id;
    ai_intents.update(ai_intents, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    ai_intents.delete(id, (result) => {
      res.send(result);
    });
  },
};

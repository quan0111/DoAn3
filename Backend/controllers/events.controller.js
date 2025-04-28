
const events = require("../models/events.model");

module.exports = {
  getAll: (req, res) => {
    events.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    events.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const events = req.body;
    events.insert(events, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const events = req.body;
    const id = req.params.id;
    events.update(events, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    events.delete(id, (result) => {
      res.send(result);
    });
  },
};

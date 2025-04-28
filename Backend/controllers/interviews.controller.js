
const interviews = require("../models/interviews.model");

module.exports = {
  getAll: (req, res) => {
    interviews.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    interviews.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const interviews = req.body;
    interviews.insert(interviews, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const interviews = req.body;
    const id = req.params.id;
    interviews.update(interviews, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    interviews.delete(id, (result) => {
      res.send(result);
    });
  },
};

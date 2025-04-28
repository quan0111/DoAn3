
const advertisements = require("../models/advertisements.model");

module.exports = {
  getAll: (req, res) => {
    advertisements.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    advertisements.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const advertisements = req.body;
    advertisements.insert(advertisements, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const advertisements = req.body;
    const id = req.params.id;
    advertisements.update(advertisements, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    advertisements.delete(id, (result) => {
      res.send(result);
    });
  },
};

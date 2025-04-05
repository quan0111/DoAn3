
const users = require("../models/users.model");

module.exports = {
  getAll: (req, res) => {
    users.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    users.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const users = req.body;
    users.insert(users, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const users = req.body;
    const id = req.params.id;
    users.update(users, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    users.delete(id, (result) => {
      res.send(result);
    });
  },
};

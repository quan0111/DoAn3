
const notifications = require("../models/notifications.model");

module.exports = {
  getAll: (req, res) => {
    notifications.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    notifications.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const notifications = req.body;
    notifications.insert(notifications, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const notifications = req.body;
    const id = req.params.id;
    notifications.update(notifications, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    notifications.delete(id, (result) => {
      res.send(result);
    });
  },
};

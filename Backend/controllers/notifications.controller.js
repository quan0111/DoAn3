const notifications = require("../models/notifications.model");

module.exports = {
  getAll: (req, res) => {
    notifications.getAll((err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    notifications.getById(id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    notifications.insert(data, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    notifications.update(data, id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    notifications.delete(id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  sendNotification: (req, res) => {
    const data = req.body;
    notifications.sendNotification(data, (err, result) => {
      if (err) return res.status(400).send({ error: err.message });
      res.send(result);
    });
  },

  scheduleNotification: (req, res) => {
    const data = req.body;
    notifications.scheduleNotification(data, (err, result) => {
      if (err) return res.status(400).send({ error: err.message });
      res.send(result);
    });
  }
};

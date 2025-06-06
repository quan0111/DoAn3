
const analytics = require("../models/analytics.model");

module.exports = {
  getAll: (req, res) => {
    analytics.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    analytics.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const analytics = req.body;
    analytics.insert(analytics, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const analytics = req.body;
    const id = req.params.id;
    analytics.update(analytics, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    analytics.delete(id, (result) => {
      res.send(result);
    });
  },
};

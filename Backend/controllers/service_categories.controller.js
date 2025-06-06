
const Service_categories = require("../models/service_categories.model");

module.exports = {
  getAll: (req, res) => {
    Service_categories.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Service_categories.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const service_categories = req.body;
    Service_categories.insert(service_categories, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const service_categories = req.body;
    const id = req.params.id;
    Service_categories.update(service_categories, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Service_categories.delete(id, (result) => {
      res.send(result);
    });
  },
};

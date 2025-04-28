
const payments = require("../models/payments.model");

module.exports = {
  getAll: (req, res) => {
    payments.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    payments.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const payments = req.body;
    payments.insert(payments, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const payments = req.body;
    const id = req.params.id;
    payments.update(payments, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    payments.delete(id, (result) => {
      res.send(result);
    });
  },
};

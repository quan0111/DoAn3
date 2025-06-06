
const user_payments = require("../models/user_payments.model");

module.exports = {
  getAll: (req, res) => {
    user_payments.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    user_payments.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const user_payments = req.body;
    user_payments.insert(user_payments, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const user_payments = req.body;
    const id = req.params.id;
    user_payments.update(user_payments, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    user_payments.delete(id, (result) => {
      res.send(result);
    });
  },
};

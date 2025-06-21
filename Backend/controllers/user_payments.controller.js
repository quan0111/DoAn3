const user_payments = require("../models/user_payments.model");
const jwt = require("jsonwebtoken");

module.exports = {
  getAll: (req, res) => {
    user_payments.getAll((err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID is required" });

    user_payments.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!result) return res.status(404).json({ error: "Payment not found" });
      res.status(200).json(result);
    });
  },

  getByStatus: (req, res) => {
    const status = req.params.status;
    if (!status) return res.status(400).json({ error: "Status is required" });

    user_payments.getByStatus(status, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(result);
    });
  },

getByUserId: (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id) return res.status(400).json({ error: "User ID is required" });

  user_payments.getByUserId(user_id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
},


getByUserIdAndStatus: (req, res) => {
  const user_id = req.params.user_id;
  const status = req.params.status;

  if (!user_id) return res.status(400).json({ error: "User ID is required" });
  if (!status) return res.status(400).json({ error: "Status is required" });

  user_payments.getByUserIdAndStatus(user_id, status, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
},


  insert: (req, res) => {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) return res.status(400).json({ error: "Data is required" });

    user_payments.insert(data, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID is required" });
    if (!data || Object.keys(data).length === 0) return res.status(400).json({ error: "Data is required" });

    user_payments.update(data, id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: result });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID is required" });

    user_payments.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: result });
    });
  },
};

const company_followers = require("../models/company_followers.model");

module.exports = {
  getAll: (req, res) => {
    company_followers.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    company_followers.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const company_followers = req.body;
    company_followers.insert(company_followers, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const company_followers = req.body;
    const id = req.params.id;
    company_followers.update(company_followers, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    company_followers.delete(id, (result) => {
      res.send(result);
    });
  },
};

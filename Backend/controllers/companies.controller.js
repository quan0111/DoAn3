
const companies = require("../models/companies.model");

module.exports = {
  getAll: (req, res) => {
    companies.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    companies.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const companies = req.body;
    companies.insert(companies, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const companies = req.body;
    const id = req.params.id;
    companies.update(companies, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    companies.delete(id, (result) => {
      res.send(result);
    });
  },
};

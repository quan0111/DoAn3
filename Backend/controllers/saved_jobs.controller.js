
const saved_jobs = require("../models/saved_jobs.model");

module.exports = {
  getAll: (req, res) => {
    saved_jobs.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    saved_jobs.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const saved_jobs = req.body;
    saved_jobs.insert(saved_jobs, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const saved_jobs = req.body;
    const id = req.params.id;
    saved_jobs.update(saved_jobs, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    saved_jobs.delete(id, (result) => {
      res.send(result);
    });
  },
};

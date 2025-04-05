
const jobseekers = require("../models/jobseekers.model");

module.exports = {
  getAll: (req, res) => {
    jobseekers.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    jobseekers.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const jobseekers = req.body;
    jobseekers.insert(jobseekers, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const jobseekers = req.body;
    const id = req.params.id;
    jobseekers.update(jobseekers, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    jobseekers.delete(id, (result) => {
      res.send(result);
    });
  },
};


  const job_categories = require("../models/job_categories.model");

  module.exports = {
    getAll: (req, res) => {
      job_categories.getAll((result) => {
        res.send(result);
      });
    },

    getById: (req, res) => {
      const id = req.params.id;
      job_categories.getById(id, (result) => {
        res.send(result);
      });
    },

    insert: (req, res) => {
      const job_categories = req.body;
      job_categories.insert(job_categories, (result) => {
        res.send(result);
      });
    },

    update: (req, res) => {
      const job_categories = req.body;
      const id = req.params.id;
      job_categories.update(job_categories, id, (result) => {
        res.send(result);
      });
    },
    getCategoriesByJob: (req, res) => {
    const jobId = req.params.id;
    job_categories.getByJobId(jobId, (result) => {
      res.send(result);
    });
  },

    countJobsByCategory: (req, res) => {
      job_categories.countJobsByCategory((err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
      });
    },

    delete: (req, res) => {
      const id = req.params.id;
      job_categories.delete(id, (result) => {
        res.send(result);
      });
    },
  };

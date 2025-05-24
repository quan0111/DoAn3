
const jobs = require("../models/jobs.model");

module.exports = {
  getAll: (req, res) => {
    jobs.getAll((result) => {
      res.send(result);
    });
  },
  getJobsByCategoryId: (req, res) => {
    const id = req.params.id;
    console.log('category_id:', id);
    jobs.getJobsByCategoryId(id, (err, result) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    jobs.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const jobs = req.body;
    jobs.insert(jobs, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const jobs = req.body;
    const id = req.params.id;
    jobs.update(jobs, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    jobs.delete(id, (result) => {
      res.send(result);
    });
  },
};

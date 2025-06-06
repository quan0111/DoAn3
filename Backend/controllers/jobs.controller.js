
const jobs = require("../models/jobs.model");

module.exports = {
  getAll: (req, res) => {
    jobs.getAll((result) => {
      res.send(result);
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
getJobsByCategory: (req, res) => {
  const categoryId = req.params.categoryId;
  jobs.getByCategoryId(categoryId, (result) => {
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

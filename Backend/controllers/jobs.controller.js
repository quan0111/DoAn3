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

getJobsByCompanyId: (req, res) => {
  const companyId = req.params.companyId;
  jobs.getByCompanyId(companyId, (result) => {
    res.send(result);
  });
},

  insert: (req, res) => {
    const newjobs = req.body;
    jobs.insert(newjobs, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const udjobs = req.body;
    const id = req.params.id;
    jobs.update(udjobs, id, (result) => {
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

  // New method to patch status
  patchStatus: (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    jobs.patchStatus(id, status, (err, result) => {
      if (err) {
        res.status(400).send({ error: err.message });
        return;
      }
      res.send({ message: result });
    });
  },
};
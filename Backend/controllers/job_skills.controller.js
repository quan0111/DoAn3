
const job_skills = require("../models/job_skills.model");

module.exports = {
  getAll: (req, res) => {
    job_skills.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    job_skills.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const job_skills = req.body;
    job_skills.insert(job_skills, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const job_skills = req.body;
    const id = req.params.id;
    job_skills.update(job_skills, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    job_skills.delete(id, (result) => {
      res.send(result);
    });
  },
};

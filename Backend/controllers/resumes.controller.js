
const resumes = require("../models/resumes.model");

module.exports = {
  getAll: (req, res) => {
    resumes.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    resumes.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const resumes = req.body;
    resumes.insert(resumes, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const resumes = req.body;
    const id = req.params.id;
    resumes.update(resumes, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    resumes.delete(id, (result) => {
      res.send(result);
    });
  },
};

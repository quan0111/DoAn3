const job_category_mappingModel = require("../models/job_category_mapping.model");

module.exports = {
  getAll: (req, res) => {
    job_category_mappingModel.getAll((err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
  },

  countJobsByCategory: (req, res) => {
    job_category_mappingModel.countJobsByCategory((err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
  },


  insert: (req, res) => {
    const data = req.body;
    job_category_mappingModel.insert(data, (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    job_category_mappingModel.update(data, id, (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    job_category_mappingModel.delete(id, (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
  },
};

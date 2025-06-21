const jobseekersModel = require("../models/jobseekers.model");

module.exports = {
  getAll: (req, res) => {
    jobseekersModel.getAll((resultOrError) => {
      if (resultOrError instanceof Error) {
        return res.status(500).json({ error: resultOrError.message });
      }
      res.status(200).json(resultOrError);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    jobseekersModel.getById(id, (resultOrError) => {
      if (resultOrError instanceof Error) {
        return res.status(500).json({ error: resultOrError.message });
      }
      res.status(200).json(resultOrError);
    });
  },

insert: (req, res) => {
  const newJobseeker = req.body;

  // Ép job_preferences thành chuỗi JSON nếu là object
  if (typeof newJobseeker.job_preferences === 'object') {
    newJobseeker.job_preferences = JSON.stringify(newJobseeker.job_preferences);
  }

  jobseekersModel.insert(newJobseeker, (resultOrError) => {
    if (resultOrError instanceof Error) {
      return res.status(500).json({ error: resultOrError.message });
    }
    res.status(201).json(resultOrError);
  });
},


update: (req, res) => {
  const updatedJobseeker = req.body;
  const id = req.params.id;

  if (typeof updatedJobseeker.job_preferences === 'object') {
    updatedJobseeker.job_preferences = JSON.stringify(updatedJobseeker.job_preferences);
  }

  jobseekersModel.update(updatedJobseeker, id, (resultOrError) => {
    if (resultOrError instanceof Error) {
      return res.status(500).json({ error: resultOrError.message });
    }
    res.status(200).json(resultOrError);
  });
},

  delete: (req, res) => {
    const id = req.params.id;
    jobseekersModel.delete(id, (resultOrError) => {
      if (resultOrError instanceof Error) {
        return res.status(500).json({ error: resultOrError.message });
      }
      res.status(200).json({ message: resultOrError });
    });
  },
};

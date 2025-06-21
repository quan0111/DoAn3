
const interviews = require("../models/interviews.model");

module.exports = {
  getAll: (req, res) => {
    interviews.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    interviews.getById(id, (result) => {
      res.send(result);
    });
  },
  
  insert: (req, res) => {
    const newinterviews = req.body;
    interviews.insert(newinterviews, (result) => {
      res.send(result);
    });
  },
  checkExistByApplicationId: (req, res) => {
  const application_id = req.params.application_id;
  interviews.existsByApplicationId(application_id, (err, exists) => {
    if (err) return res.status(500).send("Lỗi kiểm tra tồn tại");
    res.send({ exists });
  });
},


  update: (req, res) => {
    const udinterviews = req.body;
    const id = req.params.id;
    interviews.update(udinterviews, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    interviews.delete(id, (result) => {
      res.send(result);
    });
  },
};


const user_activities = require("../models/user_activities.model");

module.exports = {
  getAll: (req, res) => {
    user_activities.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    user_activities.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const user_activities = req.body;
    user_activities.insert(user_activities, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const user_activities = req.body;
    const id = req.params.id;
    user_activities.update(user_activities, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    user_activities.delete(id, (result) => {
      res.send(result);
    });
  },
};


const translations = require("../models/translations.model");

module.exports = {
  getAll: (req, res) => {
    translations.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    translations.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const translations = req.body;
    translations.insert(translations, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const translations = req.body;
    const id = req.params.id;
    translations.update(translations, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    translations.delete(id, (result) => {
      res.send(result);
    });
  },
};

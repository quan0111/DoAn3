const analytics = require("../models/analytics.model");

module.exports = {
  getAll: (req, res) => {
    analytics.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    analytics.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    analytics.insert(data, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    analytics.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    analytics.delete(id, (result) => {
      res.send(result);
    });
  },

  // ✅ Thêm hàm mới vào đây
  getAnalyticsWithDetails: (req, res) => {
    const { entity_type, metric_type } = req.query;

    if (!entity_type) {
      return res.status(400).json({ message: "Thiếu entity_type" });
    }

    analytics.getAnalyticsWithDetails(entity_type, metric_type, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi server", error: err.message });
      }
      res.send(result);
    });
  }
};

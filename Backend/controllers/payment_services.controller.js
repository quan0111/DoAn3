const payment_services = require("../models/payment_services.model");
const upload = require("../config/multer.config");
const path = require("path");
const fs = require("fs");

module.exports = {
  // Lấy tất cả dịch vụ
getAll: (req, res) => {
  payment_services.getAll((err, result) => {
    if (err) return res.status(500).send({ error: err.message });
    res.send(result);
  });
},


  // Lấy dịch vụ theo ID
  getById: (req, res) => {
    const id = req.params.id;
    payment_services.getById(id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  // Thêm dịch vụ (có xử lý ảnh)
  insert: [
    upload.single("image_url"),
    (req, res) => {
      const serviceData = req.body;
      if (req.file) {
        serviceData.image_url = `/uploads/${req.file.filename}`;
      }

      payment_services.insert(serviceData, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send(result);
      });
    },
  ],

  // Cập nhật dịch vụ (có xử lý ảnh)
  update: [
    upload.single("image_url"),
    (req, res) => {
      const id = req.params.id;
      const serviceData = req.body;

      if (req.file) {
        serviceData.image_url = `/uploads/${req.file.filename}`;

        // Xóa ảnh cũ nếu có
        payment_services.getById(id, (err, oldService) => {
          if (err) return;
          if (oldService && oldService[0]?.image_url) {
            const oldPath = path.join(__dirname, "..", oldService[0].image_url);
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }
        });
      }

      payment_services.update(serviceData, id, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send(result);
      });
    },
  ],

  // Xóa dịch vụ (xóa luôn ảnh nếu có)
  delete: (req, res) => {
    const id = req.params.id;

    payment_services.getById(id, (err, service) => {
      if (err) return;
      if (service && service[0]?.image_url) {
        const imagePath = path.join(__dirname, "..", service[0].image_url);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      payment_services.delete(id, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send(result);
      });
    });
  },
};

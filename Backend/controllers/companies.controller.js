const companies = require("../models/companies.model");
const upload = require("../config/multer.config");
const path = require("path");
const fs = require("fs");

module.exports = {
  // Lấy tất cả companies
  getAll: (req, res) => {
    companies.getAll((err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  // Lấy company theo ID
  getById: (req, res) => {
    const id = req.params.id;
    companies.getById(id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  // Thêm company mới (hỗ trợ upload logo)
  insert: [
    upload.single("logo"), // Xử lý file logo
    (req, res) => {
      const companyData = req.body;
      // Nếu có file ảnh, thêm logo_url vào companyData
      if (req.file) {
        companyData.logo_url = `/uploads/${req.file.filename}`;
      }
      companies.insert(companyData, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send(result);
      });
    },
  ],

  // Cập nhật company (hỗ trợ upload logo)
  update: [
    upload.single("logo"), // Xử lý file logo
    (req, res) => {
      const companyData = req.body;
      const id = req.params.id;
      // Nếu có file ảnh, cập nhật logo_url
      if (req.file) {
        companyData.logo_url = `/uploads/${req.file.filename}`;
        // Xóa ảnh cũ nếu có
        companies.getById(id, (err, oldCompany) => {
          if (err) return;
          if (oldCompany && oldCompany.logo_url) {
            const oldPath = path.join(__dirname, "..", oldCompany.logo_url);
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }
        });
      }
      companies.update(companyData, id, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send(result);
      });
    },
  ],

  // Xóa company
  delete: (req, res) => {
    const id = req.params.id;
    // Xóa ảnh nếu có
    companies.getById(id, (err, company) => {
      if (err) return;
      if (company && company.logo_url) {
        const logoPath = path.join(__dirname, "..", company.logo_url);
        if (fs.existsSync(logoPath)) {
          fs.unlinkSync(logoPath);
        }
      }
    });
    companies.delete(id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },
};
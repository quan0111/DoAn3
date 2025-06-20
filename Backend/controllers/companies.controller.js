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
    getByUserId: (req, res) => {
    const id = req.params.id;
    companies.getByUserId(id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  // Thêm company mới (hỗ trợ upload logo)
insert: [
  upload.single("logo"),
  (req, res) => {
    const companyData = req.body;

    // ✅ Ép kiểu industry thành chuỗi nếu là mảng
    if (Array.isArray(companyData.industry)) {
      companyData.industry = JSON.stringify(companyData.industry);
    }

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
  upload.single("logo"),
  (req, res) => {
    const companyData = req.body;
    const id = req.params.id;

    // ✅ Ép kiểu industry thành chuỗi nếu là mảng
    if (Array.isArray(companyData.industry)) {
      companyData.industry = JSON.stringify(companyData.industry);
    }

    if (req.file) {
      companyData.logo_url = `/uploads/${req.file.filename}`;
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
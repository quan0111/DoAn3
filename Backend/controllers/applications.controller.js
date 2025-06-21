const applications = require("../models/applications.model");
const path = require("path");
const fs = require("fs");

const uploadPath = "./public/cv/";

module.exports = {
  // ✅ Lấy tất cả ứng tuyển
  getAll: (req, res) => {
    applications.getAll((result) => {
      res.send(result);
    });
  },
    // ✅ Kiểm tra user đã ứng tuyển vào job chưa
  checkExists: (req, res) => {
    const { user_id, job_id } = req.query;

    if (!user_id || !job_id) {
      return res.status(400).json({ message: "Thiếu user_id hoặc job_id" });
    }

    applications.checkExists(user_id, job_id, (err, exists) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server", error: err });
      }

      res.status(200).json({ exists });
    });
  },
  // ✅ Lấy ứng tuyển theo ID
  getById: (req, res) => {
    const id = req.params.id;
    applications.getById(id, (result) => {
      res.send(result);
    });
  },

  // ✅ Lấy theo user_id
  getByUserId: (req, res) => {
    const userId = req.params.userId;
    applications.getByUserId(userId, (result) => {
      res.send(result);
    });
  },

  // ✅ Lấy theo job_id
  getByJobId: (req, res) => {
    const jobId = req.params.jobId;
    applications.getByJobId(jobId, (result) => {
      res.send(result);
    });
  },
  getApplicantsByCompany: (req, res) => {
  const companyId = req.params.companyId;
  applications.getApplicantsByCompany(companyId, (result) => {
    res.send(result);
  });
},

  // ✅ Tải file CV về
  downloadCV: (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(uploadPath, fileName);
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).send("Không tìm thấy file.");
    }
  },

  // ✅ Thêm ứng tuyển mới
  insert: (req, res) => {
    const data = req.body;
    if (req.file) {
      data.cv_file = req.file.filename;
    }

    applications.insert(data, (result) => {
      res.send(result);
    });
  },

  // ✅ Cập nhật + xóa file cũ nếu có
  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (req.file) {
      data.cv_file = req.file.filename;

      applications.getById(id, (oldRecords) => {
        const oldFile = oldRecords[0]?.cv_file;
        if (oldFile) {
          const oldPath = path.join(uploadPath, oldFile);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        applications.update(data, id, (result) => {
          res.send(result);
        });
      });
    } else {
      applications.update(data, id, (result) => {
        res.send(result);
      });
    }
  },

  // ✅ Xóa ứng tuyển + xóa file nếu có
  delete: (req, res) => {
    const id = req.params.id;

    applications.getById(id, (result) => {
      const file = result[0]?.cv_file;
      if (file) {
        const filePath = path.join(uploadPath, file);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      applications.delete(id, (result) => {
        res.send(result);
      });
    });
  },
};

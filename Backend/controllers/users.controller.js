const users = require("../models/users.model");
const upload = require("../config/multer.config");

module.exports = {
  // Lấy tất cả users
  getAll: (req, res) => {
    users.getAll((result) => {
      res.send(result);
    });
  },

  // Lấy user theo ID
  getById: (req, res) => {
    const id = req.params.id;
    users.getById(id, (result) => {
      res.send(result);
    });
  },

  // Thêm user mới (hỗ trợ upload ảnh)
  insert: [
    upload.single("avatar"), // Xử lý file avatar
    (req, res) => {
      const userData = req.body;
      // Nếu có file ảnh, thêm avatar_url vào userData
      if (req.file) {
        userData.avatar_url = `/uploads/${req.file.filename}`;
      }
      users.insert(userData, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send(result);
      });
    },
  ],

  // Cập nhật user (hỗ trợ upload ảnh)
  update: [
    upload.single("avatar"), // Xử lý file avatar
    (req, res) => {
      const userData = req.body;
      const id = req.params.id;
      // Nếu có file ảnh, cập nhật avatar_url
      if (req.file) {
        userData.avatar_url = `/uploads/${req.file.filename}`;
        // Xóa ảnh cũ nếu có (giả sử model trả về user cũ)
        users.getById(id, (oldUser) => {
          if (oldUser && oldUser.avatar_url) {
            const oldPath = path.join(__dirname, "..", oldUser.avatar_url);
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }
        });
      }
      users.update(userData, id, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send(result);
      });
    },
  ],

  // Lấy user theo email
  getByEmail: (req, res) => {
    const email = req.params.email;
    users.getByEmail(email, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  // Cập nhật last_login theo ID
  updateLastLogin: (req, res) => {
    const id = req.params.id;
    users.updateLastLogin(id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  // Cập nhật trạng thái is_active
  updateActiveStatus: (req, res) => {
    const id = req.params.id;
    const { is_active } = req.body;
    users.updateActiveStatus(id, is_active, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  // Xóa user
  delete: (req, res) => {
    const id = req.params.id;
    // Xóa ảnh nếu có
    users.getById(id, (user) => {
      if (user && user.avatar_url) {
        const avatarPath = path.join(__dirname, "..", user.avatar_url);
        if (fs.existsSync(avatarPath)) {
          fs.unlinkSync(avatarPath);
        }
      }
    });
    users.delete(id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },
};
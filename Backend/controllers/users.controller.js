const db = require("../common/db");
const users = require("../models/users.model");
const upload = require("../config/multer.config");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Số vòng băm
const fs = require("fs");
const path = require("path");

module.exports = {

  // Upload avatar
  uploadAvatar: [
    upload.single("avatar"),
    (req, res) => {
      const userId = req.params.id;
      if (!req.file) {
        return res.status(400).send({ error: "Không có file ảnh được tải lên." });
      }
      const avatarUrl = `/uploads/${req.file.filename}`;
      const userData = { avatar_url: avatarUrl, updated_at: new Date() };
      users.update(userData, userId, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send({ avatar_url: avatarUrl, message: "Cập nhật avatar thành công" });
      });
    },
  ],

  // Verify password
  verifyPassword: (req, res) => {
    const userId = req.params.id;
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({ error: "Mật khẩu không được để trống." });
    }
    users.getById(userId, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      if (result.length === 0) return res.status(404).send({ error: "User không tồn tại." });
      const isMatch = bcrypt.compareSync(password, result[0].password_hash);
      res.send({ success: isMatch });
    });
  },

  // Change password
  changePassword: (req, res) => {
    const userId = req.params.id;
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({ error: "Mật khẩu mới không được để trống." });
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).send({ error: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số." });
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return res.status(500).send({ error: "Lỗi khi hash mật khẩu: " + err.message });
      const userData = { password_hash: hash, updated_at: new Date() };
      users.update(userData, userId, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send({ message: "Đổi mật khẩu thành công" });
      });
    });
  },

  // Các hàm hiện có giữ nguyên...
  getAll: (req, res) => { 
    users.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    users.getById(id, (result) => {
      res.send(result);
    });
  },



  insert: [
    upload.single("avatar"),
    async (req, res) => {
      const userData = req.body;
      if (req.file) {
        userData.avatar_url = `/uploads/${req.file.filename}`;
      }
      if (userData.password) {
        try {
          const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
          userData.password_hash = hashedPassword;
          delete userData.password;
        } catch (err) {
          return res.status(500).send({ error: "Lỗi khi hash mật khẩu: " + err.message });
        }
      }
      users.insert(userData, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.send(result);
      });
    },
  ],

  update: [
    upload.single("avatar"),
    async (req, res) => {
      const userData = req.body;
      const id = req.params.id;
      if (req.file) {
        userData.avatar_url = `/uploads/${req.file.filename}`;
        users.getById(id, (oldUser) => {
          if (oldUser && oldUser.length > 0 && oldUser[0].avatar_url) {
            const oldPath = path.join(__dirname, "..", oldUser[0].avatar_url);
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }
          if (userData.password) {
            bcrypt.hash(userData.password, saltRounds, (err, hashedPassword) => {
              if (err) return res.status(500).send({ error: "Lỗi khi hash mật khẩu: " + err.message });
              userData.password_hash = hashedPassword;
              delete userData.password;
              users.update(userData, id, (err, result) => {
                if (err) return res.status(500).send({ error: err.message });
                res.send(result);
              });
            });
          } else {
            users.update(userData, id, (err, result) => {
              if (err) return res.status(500).send({ error: err.message });
              res.send(result);
            });
          }
        });
      } else {
        if (userData.password) {
          try {
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            userData.password_hash = hashedPassword;
            delete userData.password;
          } catch (err) {
            return res.status(500).send({ error: "Lỗi khi hash mật khẩu: " + err.message });
          }
        }
        users.update(userData, id, (err, result) => {
          if (err) return res.status(500).send({ error: err.message });
          res.send(result);
        });
      }
    },
  ],

  getByEmail: (req, res) => {
    const email = req.params.email;
    users.getByEmail(email, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  updateLastLogin: (req, res) => {
    const id = req.params.id;
    users.updateLastLogin(id, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  updateActiveStatus: (req, res) => {
    const id = req.params.id;
    const { is_active } = req.body;
    users.updateActiveStatus(id, is_active, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    users.getById(id, (user) => {
      if (user && user.length > 0 && user[0].avatar_url) {
        const avatarPath = path.join(__dirname, "..", user[0].avatar_url);
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
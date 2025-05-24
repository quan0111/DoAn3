const users = require("../models/users.model");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = {
  getAll: (req, res) => {
    users.getAll((result) => {
      res.send(result);
    });
  },

  getByEmail: (req, res) => {
    const email = req.body.email;
    users.getByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server" });
      }
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy user" });
      }
      res.json(user);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    users.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: async (req, res) => {
    try {
      const user = req.body;

      if (user.password_hash) {
        const hashedPassword = await bcrypt.hash(user.password_hash, SALT_ROUNDS);
        user.password_hash = hashedPassword;
        delete user.password;
      }

      users.insert(user, (result) => {
        res.send(result);
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo user", error });
    }
  },

  update: async (req, res) => {
    try {
      const user = req.body;
      const id = req.params.id;

      if (user.password_hash) {
        const hashedPassword = await bcrypt.hash(user.password_hash, SALT_ROUNDS);
        user.password_hash = hashedPassword;
        delete user.password;
      }

      users.update(user, id, (result) => {
        res.send(result);
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật user", error });
    }
  },

  delete: (req, res) => {
    const id = req.params.id;
    users.delete(id, (result) => {
      res.send(result);
    });
  },

  // ✅ Cập nhật thời gian đăng nhập
  updateLastLogin: (req, res) => {
    const id = req.params.id;
    users.updateLastLogin(id, (err, result) => {
      if (err) return res.status(500).json({ message: "Lỗi khi cập nhật đăng nhập", error: err });
      res.json({ message: result });
    });
  },

  // ✅ Vô hiệu hóa tài khoản
  deactivateUser: (req, res) => {
    const id = req.params.id;
    users.deactivateUser(id, (err, result) => {
      if (err) return res.status(500).json({ message: "Lỗi khi vô hiệu hóa", error: err });
      res.json({ message: result });
    });
  },

  // ✅ Đổi mật khẩu
  changePassword: async (req, res) => {
    const id = req.params.id;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "Mật khẩu mới không được để trống" });
    }

    try {
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
      users.changePassword(id, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi khi đổi mật khẩu", error: err });
        res.json({ message: result });
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
};

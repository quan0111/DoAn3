const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;

    usersModel.getByEmail(email, async (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server" });
      }

      if (!user) {
        return res.status(401).json({ message: "Tài khoản không tồn tại" });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: "Sai mật khẩu" });
      }

      // ✅ Gọi updateLastLogin
      usersModel.updateLastLogin(user.user_id, (updateErr) => {
        if (updateErr) {
          console.error("Lỗi khi cập nhật last_login:", updateErr);
        }
        // Không cần return; vẫn tiếp tục gửi token
      });

      const token = jwt.sign(
        { userId: user.user_id, email: user.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({
        token,
        user: { id: user.user_id, email: user.email, name: user.full_name },
      });
    });
  },
};

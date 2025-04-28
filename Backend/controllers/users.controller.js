
const users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const secretKey = "your_jwt_secret_key"; // 🔐 bạn nên lưu vào biến môi trường

module.exports = {
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
  GetbyEmail: (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    users.GetbyEmail(email,password, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const users = req.body;
    users.insert(users, (result) => {
      res.send(result);
    });
  },

  update: (req, res) => {
    const users = req.body;
    const id = req.params.id;
    users.update(users, id, (result) => {
      res.send(result);
    });
  },
  login:(req,res) =>{
    const { email, password } = req.body;

    users.getByEmail(email, async (user) => {
      if (!user) {
        return res.status(401).send({ error: "Email không tồn tại" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ error: "Mật khẩu không đúng" });
      }

      // Tạo JWT token
      const token = jwt.sign({ user_id: user.user_id, role: user.role }, secretKey, { expiresIn: "1d" });

      res.send({
        message: "Đăng nhập thành công",
        token,
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    users.delete(id, (result) => {
      res.send(result);
    });
  },
};

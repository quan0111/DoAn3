const cv_templates = require("../models/cv_templates.model");
const pdfParse = require("pdf-parse");
const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");
const { convert } = require("pdf-poppler");

module.exports = {
  getAll: (req, res) => {
    cv_templates.getAll((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.json(result);
    });
  },

  getPublic: (req, res) => {
    cv_templates.getPublic((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    cv_templates.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      if (!result) {
        return res.status(404).json({ message: "Mẫu CV không tồn tại" });
      }
      res.json(result);
    });
  },

  getRelated: (req, res) => {
    const id = req.params.id;
    cv_templates.getRelated(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.json(result);
    });
  },

  search: (req, res) => {
    const params = {
      name: req.query.name,
      category_id: req.query.category_id ? parseInt(req.query.category_id) : null,
      is_premium: req.query.is_premium !== undefined ? req.query.is_premium === "true" : undefined,
    };
    cv_templates.search(params, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.json(result);
    });
  },

  insert: async (req, res) => {
    try {
      // Kiểm tra file PDF
      if (!req.files || !req.files.pdf_file) {
        return res.status(400).json({ message: "Vui lòng tải lên file PDF" });
      }

      const pdfFile = req.files.pdf_file;

      // Đường dẫn tạm thời lưu file PDF
      const tempUploadPath = path.join(__dirname, "../uploads", pdfFile.name);
      await fs.mkdir(path.dirname(tempUploadPath), { recursive: true });
      await pdfFile.mv(tempUploadPath);

      // Đọc nội dung PDF để tạo HTML thô
      const pdfBuffer = await fs.readFile(tempUploadPath);
      const pdfData = await pdfParse(pdfBuffer);
      const htmlStructure = `<html><body><h1>${pdfData.text
        .split("\n")
        .filter((line) => line.trim())
        .join("</h1><p>")}</p></body></html>`;

      // Đảm bảo thư mục public/image tồn tại
      const imageDir = path.join(__dirname, "../public/image");
      await fs.mkdir(imageDir, { recursive: true });

      // Đường dẫn thumbnail
      const baseName = pdfFile.name.replace(".pdf", "");
      const timestamp = Date.now();
      const outputPrefix = `${baseName}-${timestamp}`;
      const outputPath = path.join(imageDir, outputPrefix); // không có đuôi
      const thumbnailUrl = `/image/${outputPrefix}-1.png`; // pdf-poppler sẽ thêm `-1.png`

      // Dùng pdf-poppler để chuyển đổi trang đầu tiên thành PNG
      await convert(tempUploadPath, {
        format: "png",
        out_dir: imageDir,
        out_prefix: outputPrefix,
        page: 1,
      });

      // Dữ liệu mẫu CV
      const cv_template = {
        name: req.body.name || baseName,
        description: req.body.description || "Mẫu CV từ PDF",
        thumbnail_url: thumbnailUrl,
        html_structure: htmlStructure,
        css_styles: "body { font-family: Arial; }",
        category_id: req.body.category_id || 1,
        is_premium: req.body.is_premium || 0,
        price: req.body.price || "0.00",
        popularity_score: req.body.popularity_score || 0,
      };

      // Lưu vào database
      cv_templates.insert(cv_template, async (err, result) => {
        await fs.unlink(tempUploadPath).catch(console.error); // Xoá PDF tạm
        if (err) {
          return res.status(500).json({ message: "Lỗi server", error: err });
        }
        res.status(201).json(result);
      });
    } catch (err) {
      return res.status(500).json({ message: "Lỗi xử lý PDF", error: err.message || err });
    }
  },

  update: (req, res) => {
    const cv_template = req.body;
    const id = req.params.id;
    cv_templates.update(cv_template, id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.json({ message: result });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    cv_templates.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.json({ message: result });
    });
  },
};
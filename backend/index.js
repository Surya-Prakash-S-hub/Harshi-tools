import express from "express";
import cors from "cors";
import multer from "multer";
import crypto from "crypto";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -----------------------------------------------------------------------------
// ES Module __dirname
// -----------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------------------------------------------------------
// Directories
// -----------------------------------------------------------------------------

const uploadsDir = path.join(__dirname, "uploads");
const outputsDir = path.join(__dirname, "outputs");

fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(outputsDir, { recursive: true });

// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL
    ],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// -----------------------------------------------------------------------------
// Multer
// -----------------------------------------------------------------------------

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/tiff",
  "image/bmp",
  "image/x-icon",
];

const allowedFormats = [
  "jpeg",
  "png",
  "webp",
  "avif",
  "gif",
  "tiff",
  "bmp",
  "ico",
];

const upload = multer({
  dest: uploadsDir,

  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },

  fileFilter(req, file, cb) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed."));
    }

    cb(null, true);
  },
});

// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Image Toolkit API is running 🚀");
});

app.post("/image-converter", upload.single("image"), async (req, res) => {
  let outputPath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image.",
      });
    }

    const format = req.body.format;

    if (!allowedFormats.includes(format)) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        message: "Invalid output format.",
      });
    }

    const imagePath = req.file.path;

    const fileName = req.file.originalname.replace(/\.[^/.]+$/, "");

    const uniqueId = crypto.randomBytes(6).toString("hex");

    const outputName = `${fileName}-${uniqueId}.${format}`;

    outputPath = path.join(outputsDir, outputName);

    await sharp(imagePath)
      .toFormat(format)
      .toFile(outputPath);

    // Original upload is no longer needed
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return res.download(outputPath, outputName, (err) => {
      if (err) {
        console.error(err);
      }

      if (outputPath && fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    });

  } catch (err) {
    console.error(err);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (outputPath && fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    return res.status(500).json({
      message: err.message || "Image conversion failed.",
    });
  }
});

// -----------------------------------------------------------------------------
// Multer Error Handler
// -----------------------------------------------------------------------------

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        message: "Maximum upload size is 15 MB.",
      });
    }

    return res.status(400).json({
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }

  next();
});

// -----------------------------------------------------------------------------
// Start Server
// -----------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from "express";
import cors from "cors";
import multer from "multer";
import crypto from "crypto";
import sharp from "sharp";
import fs from "fs";
import archiver from "archiver";
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
// console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  }),
);
app.use(express.json());

// -----------------------------------------------------------------------------
// Multer
// -----------------------------------------------------------------------------

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

//---------------------------------------
// SINGLE FILE UPLOAD MULTER MIDDLEWARE
//----------------------------------------

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
      "image/tiff",
      "image/bmp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed."));
    }

    cb(null, true);
  },
});

export const singleUpload = upload.single("image");

export const batchUpload = upload.array("images", 20);

// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Image Toolkit API is running 🚀");
});

app.post("/image-converter", singleUpload, async (req, res) => {
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

    await sharp(imagePath).toFormat(format).toFile(outputPath);

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

//---------------------------------------------------------------------
// IMAGE BATCH CONVERTER API GOES HERE
//-----------------------------------------------------------------------

app.post(
  "/image-batch-convert",
  upload.array("images", 20),
  async (req, res) => {
    let outputFiles = [];
    let zipPath = null;

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          message: "Please upload images.",
        });
      }

      const format = req.body.format;

      if (!allowedFormats.includes(format)) {
        return res.status(400).json({
          message: "Invalid output format.",
        });
      }

      // Convert all images
      for (const file of req.files) {
        const originalFileName = file.originalname.replace(/\.[^/.]+$/, "");

        const uniqueId = crypto.randomBytes(6).toString("hex");

        // Temporary Output Name
        const tempOutputName = `${originalFileName}-${uniqueId}.${format}`;

        // File Name shown Inside ZIP folder
        const downloadName = `${originalFileName}.${format}`;

        const outputPath = path.join(outputsDir, tempOutputName);

        await sharp(file.path).toFormat(format).toFile(outputPath);

        outputFiles.push({
          path: outputPath,
          zipName: downloadName,
        });

        // Remove uploaded original
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }

      // Create zip name
      const now = new Date();

      const zipName = `converted-images-${now.toISOString().slice(0, 10)}.zip`;

      zipPath = path.join(outputsDir, zipName);

      // Create zip
      await new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);

        const archive = archiver("zip", {
          zlib: { level: 9 },
        });

        output.on("close", resolve);

        archive.on("error", reject);

        archive.pipe(output);

        outputFiles.forEach((file) => {
          archive.file(file.path, {
            name: file.zipName,
          });
        });

        archive.finalize();
      });

      // Send zip
      return res.download(zipPath, zipName);
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        message: err.message || "Batch conversion failed.",
      });
    } finally {
      // Remove uploaded files
      if (req.files) {
        req.files.forEach((file) => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
      }

      // Remove converted images
      outputFiles.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });

      // Remove zip after response
      if (zipPath && fs.existsSync(zipPath)) {
        setTimeout(() => {
          fs.unlinkSync(zipPath);
        }, 5000);
      }
    }
  },
);

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

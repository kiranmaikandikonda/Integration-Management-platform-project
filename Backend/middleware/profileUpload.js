
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadFolder = "uploads/profile";

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileName = `profile-${req.user._id}-${Date.now()}${extension}`;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and WEBP images are allowed."));
  }
};

const profileUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});

export default profileUpload;

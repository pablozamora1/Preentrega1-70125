import multer from "multer";
// import { __dirname } from "./dirname.js";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/img");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({ storage });

export { uploader };

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  let extension = path.extname(file.originalname);
  console.log("extension :>> ", extension);

  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    console.log("File not accepted");
    cb(null, false);
  } else {
    console.log("File Accepted");
    cb(null, true);
  }
};

const multerUpload = multer({ storage, fileFilter });

export default multerUpload;

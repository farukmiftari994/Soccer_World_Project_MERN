import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  //   destination: function (req, file, cb) { //?
  //     cb(null, "/tmp/my-iploads");   //? if you need to save it in your hdd
  //   },//?
  //   filename: function (req, file, cb) {//!
  //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);//!
  //     cb(null, file.filedname + "-" + uniqueSuffix);  //! we can use this function if we want the picture to have specific name plus the date and so on
  //   },//!
});

const fileFilter = (req, file, cb) => {
  //   console.log("file :>> ", file);

  let extension = path.extname(file.originalname);
  console.log("extension :>> ", extension);

  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    console.log("File not accepted");
    cb(null, false);
  } else {
    console.log("File Accepted");
    cb(null, true);
  }

  //   cb(new Error("I dont have a clue"));
};

const multerUpload = multer({ storage, fileFilter });

export default multerUpload;

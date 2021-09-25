const multer = require("multer");

const store = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const filerFilter = (req, file, cb) => {
  cb(null, true);
};

let upload = multer({
  storage: store,
  fileFilter: filerFilter,
});

module.exports = upload.single("image");

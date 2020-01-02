const express = require("express");
const Image = require("../models/Image");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  fileName: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router
  .route("/uploadmulter")
  .post(upload.single("imageData"), (req, res, next) => {
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path
    });

    newImage
      .save()
      .then(result => {
        res.status(200).json({ success: "true" });
      })
      .catch(error => next(error));
  });

const express = require('express');
const auth = require('../middlewares/isAuth');
const posts = require('../models/posts');

const multer = require('multer');
const diskStorage = require('../utilities/diskStorage');
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      req.res.status(409).send({ status: 409, message: "File must be a photo." });
  }
  cb(null, true)
};
const upload = multer({ storage: diskStorage, fileFilter: fileFilter });
const fs = require('fs');
const props = require('../utilities/properties');

let router = express.Router();

router.post('/post', auth.isAuth, upload.single('foto'), (req, res) => {
  const file = req.file;
  let body = req.body;
  body.user = req.user.id;
  if(!file) {
    body.location = ''
  } else {
    body.location = file.filename
  }

  posts.post(body).then(data => {
    res.status(200).send({ status: 200, message: "Post uploaded", data: data });
  }).catch(err => {
    if(file) fs.unlinkSync(props.storageDir + '/' + body.location);
    res.status(500).send({ status: 500, message: "Post could not be uploaded" });
});
})

module.exports = router;
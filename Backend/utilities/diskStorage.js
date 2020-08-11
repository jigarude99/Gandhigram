const multer = require('multer')
const fs = require('fs')
const props = require('./properties');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, props.storageDir);
    },
    filename: (req, file, cb) =>  {
      cb(null, Date.now().toString() + file.originalname.substring(file.originalname.lastIndexOf('.')))
    }
  });

module.exports = storage;
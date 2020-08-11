const express = require('express');
const router = express.Router();
const props = require('../utilities/properties');
const fs = require('fs');

router.use('/auth', require('./session'));
router.use('/', require('./users'));
router.use('/', require('./posts'));

router.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  fs.createReadStream(props.storageDir + '/' + filename).pipe(res);
});

module.exports = router;

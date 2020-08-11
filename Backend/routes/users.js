const express = require('express');
const auth = require('../middlewares/isAuth');
const users = require('../models/users');
let router = express.Router();

/* body:
- follow: boolean
- target: integer
- user: integer
*/
router.post('/follow', auth.isAuth, (req, res) => {
  let body = req.body;
  body.user = req.user.id;
  users.follow(body).then(data => {
      res.status(200).send({ status: 200, message: body.follow ? "User followed succesfully" : "User unfollowed succesfully", data: data });
  }).catch(err => {
      res.status(500).send({ status: 500, message: "User is already being followed" });
  });
});

router.get('/followers/:user', (req, res) => {
  const user = req.params.user;
  users.getFollowers(user).then(data => {
    res.status(200).send({ status: 200, message: "Followers List", data: data });
  }).catch(err => {
    res.status(500).send({ status: 500, message: "Error retrieving followers list" });
  });
})

router.get('/posts/:user', (req, res) => {
  const user = req.params.user;
  users.getPosts(user).then(data => {
    res.status(200).send({ status: 200, message: "Post List", data: data });
  }).catch(err => {
    res.status(500).send({ status: 500, message: "Error retrieving post list" });
  });
})

module.exports = router;
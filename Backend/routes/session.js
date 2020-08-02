const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/isAuth');
const users = require('../models/users');
const bcrypt = require('bcryptjs');
let router = express.Router();

router.post('/login', auth.isLogged, passport.authenticate('local'), (req, res) => {
    res.status(200).send({
        status: 200,
        message: "Logged in successfully.",
        user: req.user
    })
});

router.get('/logout', auth.isAuth, (req, res) => {
    req.logout();
    res.status(200).send({ status: 200, message: "Logged out successfully" });
});

router.post('/register', auth.isLogged, (req, res) => {
    let user = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
        })
    });
    
    users.register(user).then(data => {
        req.login(data, err => {});
        delete data.password
        res.status(200).send({ status: 200, message: 'Signed up successfully.', data: data })
    }, err => {
        res.status(err.status).send(err)
    })
});

router.put('/modify', auth.isAuth, auth.checkEmail, auth.checkUsername, (req, res) => {
    let user = req.body;
    user.id = req.user.id;
    users.modify(user).then(data => {
        delete data.password;
        res.status(200).send({ status: 200, message: "Modified successfully.", data: data });
    }).catch(err => {
        res.status(500).send({ status: 500, message: err });
    });
});

router.put('/changeprivacy', auth.isAuth, (req, res) => {
    let user = req.body;
    user.id = req.user.id;
    users.changePrivacy(user).then(data => {
        delete data.password;
        res.status(200).send({ status: 200, message: "Privacy Changed successfully.", data: data });
    }).catch(err => {
        res.status(500).send({ status: 500, message: err });
    });
});

module.exports = router;
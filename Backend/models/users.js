const db = require('../utilities/db');
const bcrypt = require('bcryptjs');
const properties = require('../utilities/properties');

module.exports.getUserByUsername = (username) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.one(properties.login, [username]).then(user => {
                res(user);
                obj.done();
            }).catch(err => {
                rej(err);
            });
        }).catch(err => {
            rej(err);
        });
    })
};

module.exports.comparePassword = (candidatePassword, hash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if(err) rej(err);
            res(isMatch);
        })
    })
};

module.exports.register = user => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.oneOrNone(properties.checkUsernameAndEmail, [user.username, user.email]).then(data => {
                if(data === null) {
                    obj.one(properties.register, [user.nombre, user.apellido, user.username, user.email, user.descripcion, user.password]).then(u => {
                        const beautifulUser = {
                            id: u.id,
                            username: u.username,
                            email: u.email,
                            nombre: u.nombre,
                            apellido: u.apellido,
                            descripcion: u.descripcion
                        }
                        res(beautifulUser);
                        obj.done()
                    }).catch(err => {
                        rej({ status: 500, message: "Query Error" });
                    });
                } else {
                    rej({ status: 409, messsage: "Username or Email already in use." })
                }
            })
        }).catch(err => {
            rej({ status: 500, message: "Database Error" });
        })
    })
};
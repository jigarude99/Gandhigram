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

module.exports.modify = user => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.updateUser, [user.nombre, user.apellido, user.descripcion, user.email, user.username, user.id]).then(data => {
                res(user);
                obj.done();
            }).catch(err => {
                console.log(err);
                rej("Database Error");
            });
        }).catch(err => {
            console.log(err);
            rej("Database Error");
        });
    });
};

module.exports.changePrivacy = user => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.none(properties.changePrivacy, [user.is_private, user.id]).then(data => {
                res(user);
                obj.done();
            }).catch(err => {
                console.log(err);
                rej("Database Error");
            });
        }).catch(err => {
            console.log(err);
            rej("Database Error");
        });
    });
};

module.exports.getEmail = (email, id) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.oneOrNone(properties.checkEmail, [email, id]).then (data => {
                if(data)
                    res(true);
                else
                    res(false);
            }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            })
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.getUsername = (username, id) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.oneOrNone(properties.checkUsername, [username, id]).then (data => {
                if(data)
                    res(true);
                else
                    res(false);
            }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            })
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.follow = (body) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            if(body.follow) {
                obj.none(properties.follow, [body.user, body.target]).then (() => {
                    res();
                }).catch(err => {
                    console.log(err);
                    rej(properties.dbError);
                })
            } else {
                obj.none(properties.unfollow, [body.user, body.target]).then (() => {
                    res();
                }).catch(err => {
                    rej(err);
                })
            }
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.getFollowers = (user) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.manyOrNone(properties.getFollowers, [user]).then (data => {
                res(data);
            }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            })
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};

module.exports.getPosts = (user) => {
    return new Promise((res, rej) => {
        db.connect().then(obj => {
            obj.manyOrNone(properties.getPosts, [user]).then (data => {
                res(data);
            }).catch(err => {
                console.log(err);
                rej(properties.dbError);
            })
        }).catch(err => {
            console.log(err);
            rej(properties.dbConError);
        });
    });
};
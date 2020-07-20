let user = require('./users');
let LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy((username, password, done) => {
     user.getUserByUsername(username).then(u => {
        const beautifulUser = {
            id: u.id,
            username: u.username,
            email: u.email,
            nombre: u.nombre,
            apellido: u.apellido,
            descripcion: u.descripcion
        }
         if (u.error) {
             return done(null, false);
         }
         user.comparePassword(password, u.password).then(isMatch => {
             if(isMatch) {
                 return done(null, beautifulUser)
             }
             else {
                 return done(null, false)
             }
         })
     }, err => {
         return done(null, false);
     });
});
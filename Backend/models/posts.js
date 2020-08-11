const db = require('../utilities/db');
const properties = require('../utilities/properties');

module.exports.post = (body) => {
  return new Promise((res, rej) => {
      db.connect().then(obj => {
          obj.one(properties.post, [body.user, body.descripcion, body.location]).then (data => {
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
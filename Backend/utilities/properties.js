module.exports = {
    dbUrl: 'postgres://postgres:123@localhost:5432/Gandhigram',
    port: 3000,

    login: 'SELECT * FROM auth_user WHERE username = $1 OR email = $1;',
    register: 'INSERT INTO auth_user(nombre, apellido, username, email, descripcion, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    checkEmail: 'SELECT * FROM auth_user WHERE email = $1 AND id <> $2;',
    checkUsername: 'SELECT * FROM auth_user WHERE username = $1 AND id <> $2;',
    checkUsernameAndEmail: 'SELECT * FROM auth_user WHERE username = $1 OR email = $2',
    updateUser: 'UPDATE auth_user SET nombre = $1, apellido = $2, descripcion = $3, email = $4, username = $5 WHERE id = $6;',
    changePrivacy: 'UPDATE auth_user SET is_private = $1 WHERE id = $2;'
};
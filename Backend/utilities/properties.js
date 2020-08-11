module.exports = {
    dbUrl: 'postgres://postgres:123@localhost:5432/Gandhigram',
    port: 3000,
    storageDir: 'C:/assets',

    login: 'SELECT * FROM auth_user WHERE username = $1 OR email = $1;',
    register: 'INSERT INTO auth_user(nombre, apellido, username, email, descripcion, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    checkEmail: 'SELECT * FROM auth_user WHERE email = $1 AND id <> $2;',
    checkUsername: 'SELECT * FROM auth_user WHERE username = $1 AND id <> $2;',
    checkUsernameAndEmail: 'SELECT * FROM auth_user WHERE username = $1 OR email = $2',
    updateUser: 'UPDATE auth_user SET nombre = $1, apellido = $2, descripcion = $3, email = $4, username = $5 WHERE id = $6;',
    changePrivacy: 'UPDATE auth_user SET is_private = $1 WHERE id = $2;',
    follow: 'INSERT INTO follower (follower, followed) VALUES ($1, $2);',
    unfollow: 'DELETE FROM follower WHERE follower = $1 AND followed = $2;',
    getFollowers: 'SELECT u.id, u.nombre, u.apellido, u.descripcion, u.email, u.username, u.is_private FROM auth_user u INNER JOIN follower f ON f.followed = u.id WHERE f.follower = $1;',
    post: 'INSERT INTO post(user_id, descripcion, foto) VALUES ($1, $2, $3) RETURNING *;',
    getPosts: 'SELECT * FROM post WHERE user_id = $1;'
};
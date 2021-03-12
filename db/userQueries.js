const createUserTable = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false
)`;

const getUserList = `SELECT id, username, is_admin FROM users`;

const user_find = `SELECT * FROM users
    WHERE username = $1
`;

const user_add = `INSERT INTO users(
    username,
    password,
    is_admin
) VALUES ($1,$2,$3)`;


const user_delete = `DELETE FROM users
    WHERE id = $1 returning *
`;

const user_get = `SELECT id, username, is_admin FROM users 
    WHERE id = $1
`;

const userId_find = `SELECT * FROM users
WHERE id = $1
`;

const user_update = `UPDATE users
    SET username = $1,
        password = $2,
        is_admin = $3
    WHERE id = $4
`;

module.exports = {
    createUserTable,
    getUserList,
    user_find,
    user_add,
    user_delete,
    user_get,
    userId_find,
    user_update
}
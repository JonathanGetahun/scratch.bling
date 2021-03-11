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
    WHERE item_name = $1 returning *
`;

module.exports = {
    createUserTable,
    getUserList,
    user_find,
    user_add,
    user_delete
}
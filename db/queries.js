const create_back_scratchers = `CREATE TABLE backScratcher (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR NOT NULL UNIQUE,
    item_description VARCHAR NOT NULL,
    item_size text[] NOT NULL,
    item_cost VARCHAR(50) NOT NULL
)`;

const backScratcher_add = `INSERT INTO backScratcher(
    item_name,
    item_description,
    item_size,
    item_cost
) VALUES ($1,$2,$3,$4)`;


const backscratchersList = `SELECT item_name,
item_description, item_size, item_cost FROM backScratcher`;

const backScratcher_find = `SELECT * FROM backScratcher
    WHERE item_name = $1
`;

const backScratcher_update = `UPDATE backScratcher
    SET item_name = $1,
        item_description = $2,
        item_size = $3,
        item_cost = $4
    WHERE item_name = $5
`;

const backScratcher_delete = `DELETE FROM backScratcher
    WHERE item_name = $1 returning *
`;

module.exports = {
    create_back_scratchers,
    backScratcher_add,
    backscratchersList,
    backScratcher_find,
    backScratcher_update,
    backScratcher_delete
};
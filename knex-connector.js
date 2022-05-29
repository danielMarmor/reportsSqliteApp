const knex = require('knex');
const config = require('config');


const db_conn = config.get('db_conn');

// knex connector
const connectedKnex = knex({
    client: db_conn.client,
    connection: {
        filename: db_conn.filename
    }
});

module.exports = connectedKnex;
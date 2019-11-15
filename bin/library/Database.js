const mariaDB = require('mariadb');
const config = require('../../config/_config');

class DatabaseDev {

    static query(query) {
        if (DatabaseDev.pool === null) {
            DatabaseDev.pool = mariaDB.createPool({
                host: config.DB_HOST,
                user: config.DB_USER,
                password: config.DB_PASSWORD,
                database: config.DB_NAME,
                connectionLimit: config.DB_CONN_LIMIT,
                connectTimeout: 2000
            });
        }
        return new Promise(function (resolve) {
            DatabaseDev.pool.getConnection()
                .then(function (conn) {
                    conn.query(query)
                        .then(function (rows) {
                            conn.release();
                            resolve(rows);
                        })
                        .catch(err => {
                            conn.release();
                            console.log('Database ' + err);
                        });
                })
                .catch(err => {
                    console.log('Database one more ' + err);
                });
        });
    }
}

DatabaseDev.pool = null;
DatabaseDev.instance = null;

module.exports = DatabaseDev;

const { Pool } = require('pg')
const pool = new Pool({
  user: 'pavelvasylkivskiy',
  host: 'localhost',
  database: 'reflection_db',
  password: '',
  port: '5432',
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    reflections(
      id  UUID  PRIMARY KEY,
      success VARCHAR(128) NOT NULL,
      low_point VARCHAR(128) NOT NULL,
      take_away VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP)`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS reflections';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');



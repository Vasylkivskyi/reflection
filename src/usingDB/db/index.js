import { Pool } from 'pg';
import dotenv from 'dotenv';

const pool = new Pool({
  user: 'pavelvasylkivskiy',
  host: 'localhost',
  database: 'reflection_db',
  password: '',
  port: '5432',
});

dotenv.config();

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
}



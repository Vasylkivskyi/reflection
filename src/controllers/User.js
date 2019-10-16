import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helper';
import { create } from 'domain';

const User = {
  async create(req, res) {
    if (!req.body.email && !req.body.password) {
      return res.status(400).send({ 'message': 'Some value are missing...' })
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email' })
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
    users(id, email, password, created_date, modified_date)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
    const values = [
      uuidv4(),
      req.body.email,
      hashPassword,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ token });
    } catch (err) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(err);
    }
  }



};

export default User;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  // Hashing the password to store safe in the db
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  // Comparing entered password with user password
  comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },

  // Validating an email
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  // Generate new token
  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }
}

export default Helper;

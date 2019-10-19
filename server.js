import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import Reflection from './src/controllers/Reflection';
import Auth from './src/middleware/Auth';
import User from './src/controllers/User';

dotenv.config();
console.log("----", Reflection.create);
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});

app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
app.get('/api/v1/reflections', Auth.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
app.post('/api/v1/users', User.create);
app.post('/api/v1/users/login', User.login);
app.delete('/api/v1/users/me', Auth.verifyToken, User.delete);

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`App is running on port ${PORT}`));

import express from 'express';
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send({ 'message': 'Is working' });
});

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`App is running on port ${PORT}`));

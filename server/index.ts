import express from 'express';
import users from './data/users.json';

const app = express();
const port = 3000;

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/auth', (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    res.statusCode = 400;
    res.send({ message: 'Не заполнены обязательные поля' });
    return;
  }

  const user = users.find((u) => u.login === login);
  if (!user || user.password !== password) {
    res.statusCode = 404;
    res.send({ message: 'Неверный логин / пароль' });
    return;
  }

  res.json({ id: user.id, name: user.name, role: user.role });
});

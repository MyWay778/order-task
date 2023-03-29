import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import path from 'path';
import verifyJWT from './middleware/verifyJWT';
import {
  handleAddOrder,
  handleDelete,
  handleGetOrders,
  handlePatchOrder
} from './controllers/orderController';
import {
  handleAuth,
  handleLogin,
  handleLogout,
  handleRefreshToken
} from './controllers/authController';
import addHeaders from './middleware/addHeaders';

dotenv.config({ path: './server/.env' });

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(addHeaders);
app.use(express.static(path.join(__dirname, '/../public')));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Можно получить хешированный пароль
// app.get('api/pass', (req, res) => {
//   const passAdmin = '123456789';
//   const passUser = '123456789';

//   Promise.all([bcrypt.hash(passAdmin, 10), bcrypt.hash(passUser, 10)]).then(([admin, user]) => {
//     res.json({ admin, user });
//   });
// });

// Роуты авторизации
app.post('/api/login', handleLogin);
app.get('/api/auth', verifyJWT, handleAuth);
app.get('/api/refresh', handleRefreshToken);
app.get('/api/logout', handleLogout);

// Роуты заказов
app.get('/api/orders', verifyJWT, handleGetOrders);
app.patch('/api/orders/:orderId', verifyJWT, handlePatchOrder);
app.delete('/api/orders/:id', verifyJWT, handleDelete);
app.post('/api/orders/', verifyJWT, handleAddOrder);

app.get('*', (req: Request, res: Response) => {
  res.redirect('/');
});

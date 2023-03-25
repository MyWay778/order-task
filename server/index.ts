import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Можно получить хешированный пароль
// app.get('/', (req, res) => {
//   const passAdmin = '123456789';
//   const passUser = '123456789';

//   Promise.all([bcrypt.hash(passAdmin, 10), bcrypt.hash(passUser, 10)]).then(([admin, user]) => {
//     res.json({ admin, user });
//   });
// });

// Роуты авторизации
app.post('/login', handleLogin);
app.get('/auth', verifyJWT, handleAuth);
app.get('/refresh', handleRefreshToken);
app.get('/logout', handleLogout);

// Роуты заказов
app.get('/orders', verifyJWT, handleGetOrders);
app.patch('/orders/:orderId', verifyJWT, handlePatchOrder);
app.delete('/orders/:id', verifyJWT, handleDelete);
app.post('/orders/', verifyJWT, handleAddOrder);

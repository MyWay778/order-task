# order-task

Fullstack приложение заказов. Состоит из страниц авторизации, списка заказов и добавления заказа.

### Технологический стек:

- TypeScript
- Vue3 (Composition API)
- Pinia
- Vue Router
- Vite
- Express

### Данные для аутентификации

```js
// роль админ
login: 'admin';
password: '123456789';

// роль user
login: 'user';
password: '123456789';
```

### Установка приложения

```sh
npm install
```

### Запуск в режиме разработки

```sh
npm run dev
```

Frontend запускается на: http://localhost:5173/  
Backend: http://localhost:3000/

### Production сборка и запуск

```sh
npm run build && npm start
```

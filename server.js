const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // раздача index.html, login.html и др.

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Страница входа
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Простой фейк-логин, позже заменим на базу
  if (username === 'admin' && password === '1234') {
    req.session.user = username;
    res.send(`<h2>Welcome, ${username}!</h2><a href="/">Go Home</a>`);
  } else {
    res.send('<h2>Invalid login</h2><a href="login.html">Try again</a>');
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Простая база пользователей (в памяти)
const users = [];

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = username;
    res.send(`<h2>Welcome, ${username}!</h2><a href="/">Go Home</a>`);
  } else {
    res.send('<h2>Invalid login</h2><a href="login.html">Try again</a>');
  }
});

// REGISTER
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const exists = users.find(u => u.username === username);

  if (exists) {
    res.send('<h2>User already exists</h2><a href="register.html">Try again</a>');
  } else {
    users.push({ username, password });
    res.send(`<h2>Account created for ${username}</h2><a href="login.html">Login now</a>`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

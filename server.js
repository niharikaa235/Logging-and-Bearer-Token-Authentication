
// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Logging Middleware
app.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.url}`);
  next();
});

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing or incorrect' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== 'mysecrettoken') {
    return res.status(403).json({ message: 'Invalid token' });
  }
  next();
}

// Routes
app.get('/public', (req, res) => {
  res.status(200).send('This is a public route. No authentication required.');
});

app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).send('You have accessed a protected route with a valid Bearer token!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

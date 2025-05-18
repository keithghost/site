require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const qrRouter = require('./qr'); // Import the QR router

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/tiktok', (req, res) => {
  res.sendFile(__dirname + '/public/tiktok.html');
});

// QR Route
app.use('/qr', qrRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

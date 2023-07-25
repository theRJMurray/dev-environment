// index.js
const express = require('express');
const app = express();
const port = 3000; // You can use any port you prefer

// Example route - replace this with your own routes and logic
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to your Express.js backend!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
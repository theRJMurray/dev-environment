const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const dbName = 'dashboard';

app.use(express.json())

// Connect to MongoDB
const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@hypecluster.wqd70l2.mongodb.net/?retryWrites=true&w=majority&ssl=true`, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connect() {
  try {
    await client.connect();
    console.log('Database in orbit');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connect();


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
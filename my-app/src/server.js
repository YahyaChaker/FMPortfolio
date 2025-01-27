const express = require('express');
const odbc = require('odbc');
const path = require('path');

// Initialize the app
const app = express();
const port = 3001;

// Database connection string
const dbPath = path.join(__dirname, 'FM_Director_Portfolio.accdb');
const connectionString = `Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=${dbPath};`;

// Define a route to fetch data from the database
app.get('/api/clients', async (req, res) => {
  try {
    const connection = await odbc.connect(connectionString);
    const result = await connection.query('SELECT * FROM Clients');
    await connection.close();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
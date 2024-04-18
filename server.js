const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3304;

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'form_data' // Replace with your MySQL database name
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, phone } = req.body;

    // Insert data into the database
    const query = 'INSERT INTO form_data (name, email, phone) VALUES (?, ?, ?)';
    connection.query(query, [name, email, phone], (error, results, fields) => {
        if (error) {
            console.error('Error inserting data into database:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Data inserted into database with ID:', results.insertId);
        res.status(200).json({ message: 'Form submitted successfully' });
    });
});

// Route handler for root URL
app.get('/', (req, res) => {
    res.send('Hello, World! This is the root URL.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

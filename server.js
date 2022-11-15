const express = require('express');
const pool = require('./helpers/database');
const dotenv = require('dotenv').config({ path: '.env-local' });

const PORT = process.env.PORT || '3000'

const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (request, response) => {
    response.status(200).send("Wrong place.")
})

// Get all sources
app.get('/sources', function(req, res) {
    res.json(res)
})

// Get one source
app.get('/sources/:id', async function(req, res) {
    try {
        const sqlQuery = 'SELECT id, title, link, editMode, created_at FROM source WHERE id=?'
        const rows = await pool.query(sqlQuery, req.params.id)
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }

    res.status(200).json({ id: req.params.id })
})

// Start listening
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
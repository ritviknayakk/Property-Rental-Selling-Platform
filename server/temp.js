const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./Routes/auth');
const itemModel = require('./models/Item'); // Optional test collection
const cors = require('cors');

const app = express()
const PORT = 5004;
// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', authRoutes);

// Optional test route to see DB data
app.get('/', async (req, res) => {
    try {
        const items = await itemModel.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

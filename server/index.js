const express = require('express');
const connectDb = require('./db.js');
const itemModel = require('./models/Item.js');
const cors = require('cors');
const authRoutes = require('./Routes/auth.js');
const propertyRoutes = require('./Routes/property.js');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });
const app = express();

app.use(express.json());

// Allow requests from frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Connect to MongoDB
connectDb();

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/property', propertyRoutes);

// Basic route to test fetching all items
app.get('/', async (req, res) => {
    try {
        const items = await itemModel.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint to handle property image upload
app.post('/api/property/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  // Send back the URL where the image is stored
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Start the server
app.listen(5000, () => {
    console.log("app is running");
});
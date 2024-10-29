const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database Connection (MongoDB example)
mongoose.connect('mongodb://localhost:27017/shopDB', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    userType: String,
});

// Item Schema
const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    stock: Number,
});

// Models
const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);

// Setup multer for file uploads (optional)
const upload = multer({ dest: 'uploads/' });

// Registration endpoint
app.post('/register', upload.single('document'), async (req, res) => {
    const { fullName, email, password, userType } = req.body;

    const newUser = new User({ fullName, email, password, userType });
    await newUser.save();

    res.json({ message: 'Registration successful!', userType });
});

// Item listing endpoint
app.post('/sell-item', async (req, res) => {
    const { name, price, description, stock } = req.body;

    const newItem = new Item({ name, price, description, stock });
    await newItem.save();

    res.json({ message: 'Item listed successfully!', item: newItem });
});

// Get all items endpoint
app.get('/items', async (req, res) => {
    const items = await Item.find({});
    res.json(items);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

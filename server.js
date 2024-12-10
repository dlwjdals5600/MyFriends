import 'dotenv/config';
import app from './src/app.js';

// require('dotenv').config();
// const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');

const PORT = process.env.PORT || 5000;

dotenv.config();

dbConnect();

const app = express();

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
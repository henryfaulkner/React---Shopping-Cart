const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const db = require('./DB');
const orderRouter = require('./Routes/order-router');
const HttpError = require('./Models/http-error');

const app = express();
const apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Alleow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', orderRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    return next(error);
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
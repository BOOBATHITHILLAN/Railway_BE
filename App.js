const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./Routes/UserRoutes');

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
module.exports = app;
 
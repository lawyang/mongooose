const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// process.env.PORT - for HEROKU
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Connect to MongoDB
const mongoose = require('mongoose');

const DATABASE_NAME = 'library'
const DATABASE_URL = `mongodb://localhost:27017/${DATABASE_NAME}`; 
mongoose.connect(DATABASE_URL);


/// without the console logs you wouldnt know you are getting an error
mongoose.connection.on('connected', () => {
    console.log(`Mongoose is connected to ${DATABASE_URL}`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Mongoose connetion error: ${error}`);
});



const bookRouter = require('./routers/book.router');
app.use('/book', bookRouter);
app.listen(PORT, () => console.log(`server listening on ${PORT}`));


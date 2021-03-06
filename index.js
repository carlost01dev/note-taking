const express = require('express');
const app = express();
const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies.js');

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/movies?authSource=admin', {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'root',
    pass: 'example'
});
const db = mongoose.connection;
db.on('error', error => console.error(error));

db.once('open', () => console.log('conected to database'));

app.use(express.json());
app.use('/movies', moviesRouter);

app.get('/', (req, res) => res.send('Hello World'));

app.listen(process.env.PORT || 3000, () => console.log('Listening port 3000'));
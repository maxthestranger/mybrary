if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// routes
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');

// view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log('Error connecting to DB', error));
db.once('open', () => console.log('Connected successfuly'));

// routers
app.use('/', indexRouter);
app.use('/authors', authorsRouter);

// port
app.listen(process.env.PORT || 3000);

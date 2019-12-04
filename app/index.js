
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
// Intializations
const app = express();

app.set('port', process.env.PORT || 4000);


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let products = require('./routes/products');
app.use('/api', products);

// Starting
app.listen(app.get('port'), () => {
    console.log('Server is on port', app.get('port'));
});




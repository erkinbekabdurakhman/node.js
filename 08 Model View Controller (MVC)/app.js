const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const errorController = require('./controllers/404');

app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(shopRoutes);

app.use(errorController.errorPage);

app.listen(3001);
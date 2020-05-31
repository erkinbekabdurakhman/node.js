const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'pagenot.html'));
});

app.listen(3001);
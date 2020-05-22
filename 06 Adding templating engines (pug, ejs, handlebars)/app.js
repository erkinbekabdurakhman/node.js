const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Importing handlebars
// const expressHbs = require('express-handlebars'); 

// Setting function
// app.engine(
//     'hbs', 
//     expressHbs({
//         layoutsDir: 'views/layout', 
//         defaultLayout: 'main-layout', 
//         extname: 'hbs'
//     })
// )

//Initializing to view engine
app.set('view engine', 'ejs'); 
app.set('views', 'views');

const path = require('path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminData.routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {path, pageTitle: 'Page Not Found'});
});

app.listen(3001);
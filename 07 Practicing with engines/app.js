const express = require('express'); //importing express library
const bodyParser = require('body-parser'); //importing body-parser

//optionally doing with handlebars
const expressHbs = require('express-handlebars'); //importing handlebars engine

const app = express(); //creating express app

const users = [];
 //registering hbs locally to project
// app.engine('hbs', expressHbs({defaultLayout: 'main-layout', extname: 'hbs'}));

app.set('view engine', 'ejs') // currently using hbs

// app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false})); //setting locally

app.get('/', (req, res, next) => {
    //rendering index page
    res.render('index', {pageTitle: 'Add User'});
});

app.get('/add-user', (req, res, next) => {
    //rendering users page
    res.render('users', {
                            pageTitle: 'Users',
                            users: users,
                            hasUsers: users.length > 0
                        });
});

app.post('/add-user', (req, res, next) => {
    //parsing incoming data into array & redirecting to users page
    users.push({name: req.body.username});
    res.redirect('/add-user');
});

app.listen(3003);
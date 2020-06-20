const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn =(req.get('Cookie').trim().split('=')[1]);
    // console.log(isLoggedIn);
    console.log(req.session);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}

exports.getRegister = (req, res, next) => {
    res.render('auth/register', {
        path: '/register',
        pageTitle: 'Register',
        isAuthenticated: req.isLoggedIn
    })
}

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;

    res.redirect('/');

    // const id = req.body.userId;
    // const name = req.body.userName;
    // const email= req.body.userEmail;
    // const number = req.body.userNumber;

    // req.user.createUser({
    //     name: name,
    //     email: email,
    //     number: number
    // }).then(result => {
    //     console.log(result);
    //     res.redirect('/');
    // }).catch(err => {
    //     console.log(err);
    // })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}
const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const errorController = require('./controllers/404');

const sequelize = require('./util/database');
const session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

const Product = require('./models/products');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '1Qaz2Wsx3Edc4Rfv', 
    resave: false, 
    saveUninitialized: false, 
    store: new SequelizeStore({
    db: sequelize
  }) }));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    });
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.errorPage);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

//{ force: true }
sequelize.sync().then(result => {
    return User.findByPk();
    // console.log(User);
}).then(user => {
    if(!user){
       return  User.create({name: '', email: 'erkinbek.abdurahman2@gmail.com', number: '770387234'});
    }
    return user;
}).then(user => {
    // console.log(user);
    return user.createCart()
}).then(cart => {
    app.listen(5000);
}).catch(err => {
    console.log(err);
});


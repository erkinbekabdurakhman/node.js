const Product = require('../models/products');
const path = require('path');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path:'admin/add-product',
            editing: false
        })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    const product = new Product(null, title, price, description, imageUrl);
    product.save().then( () => {res.redirect('/');}).catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
       return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    }); 
}

exports.postEditProduct = (req, res, next) => {
    const {
        productId: prodId,
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        price: updatedPrice,
        description: updatedDescription,
    } = req.body;

    const updatedProduct = new Product( 
        prodId, 
        updatedTitle, 
        updatedImageUrl, 
        updatedPrice, 
        updatedDescription
    );

    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin all products',
            path:'/admin/products'
        })
    });
}
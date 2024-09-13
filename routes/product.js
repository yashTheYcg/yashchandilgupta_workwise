const {Router} = require('express');
const router = Router()
const controller = require('../controller/product.controller');
const {body,query} = require('express-validator');
const fetchUser = require('../middleware/fetchUser.js'); //middleware for authorization


// route for adding the product
router.post('/product' ,fetchUser , [
    body('name').optional().trim().escape(),
    body('category').optional().trim().escape(),
    body('description').optional().trim().escape(),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('discount').optional().isFloat({ min: 0, max: 1 }).withMessage('Discount must be between 0 and 1')
] ,controller.addProduct);


// route for edit the product
router.put('/product/:productId' ,fetchUser , [
    // Validate and sanitize input
    body('name').optional().trim().escape(),
    body('category').optional().trim().escape(),
    body('description').optional().trim().escape(),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('discount').optional().isFloat({ min: 0, max: 1 }).withMessage('Discount must be between 0 and 1')
] ,controller.editProduct);


// route for deleting the product
router.delete('/product/:productId' ,fetchUser ,controller.deleteProduct);


// route for getting all available products
router.get('/product',fetchUser, [
    query('name').optional().trim().escape(),
    query('category').optional().trim().escape(),
],controller.getProduct);


// route for adding product to the cart list
router.post('/cart', fetchUser, [
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0')
] ,controller.addProductToCart);


// route for remove product from the cart list
router.delete('/cart/:productId', fetchUser, controller.removeProductFromCart);

module.exports = router;
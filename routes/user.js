const {Router} = require('express');
const router = Router()
const controller = require('../controller/user.controller');
const {body} = require('express-validator');

// Route-1 for creating  the user
router.post('/signup',[
    // Validate and sanitize input
    body('email').trim().isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 6 }), // Ensure password is at least 6 characters
    body('type').trim(), 
],   
    controller.signupUser);

// Route-2 for logging  the user
router.post('/login', [
    body('email').trim().isEmail().normalizeEmail(),
    body('password').trim() // Ensure password is at least 6 characters
],controller.loginUser);


module.exports = router;
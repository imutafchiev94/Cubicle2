const {Router} = require('express');

const {COOKIE_NAME} = require('../config/config');
const authService = require('../services/authService');
const validator = require('validator');
const {check, validationResult} = require('express-validator');

const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    try {
        let token = await authService.login(req.body);
        
        res.cookie(COOKIE_NAME, token);
        res.redirect('/');
    }
    catch (error) {
       console.log(error); 
       res.render('login', {error});
    }
})

router.post('/register', isGuest, async (req, res) => {
    const {username, password, repeatPassword} = req.body;
    let isStrong = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });

    

    if(password !== repeatPassword) {
       return res.render('register', {message: 'Password missmatch'});
    }

    try {
        if(!isStrong) {
            return res.render('register', {error: { message: "You should have strong password"}, username: req.body.username});
        }

        let result = await authService.register(req.body);

        console.log(result);
        res.redirect('/auth/login');
    }
    catch (error) {
        res.render('register', {error});
    }
})

router.get('/register', isGuest, (req, res) => {
    
    res.render('register');
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);

    res.redirect('/');
})



module.exports = router;
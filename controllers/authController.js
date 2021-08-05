const {Router} = require('express');

const {COOKIE_NAME} = require('../config/config');
const authService = require('../services/authService');
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

    if(password !== repeatPassword) {
       return res.render('register', {message: 'Password missmatch'});
    }

    try {
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
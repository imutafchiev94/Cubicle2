const {Router} = require('express');

const productService = require('../services/productService');

const router = Router();

router.get('/', (req, res) => {

    let cubes = productService.getAll(req.query)
    .then(cubes => {
        res.render('index', {title: 'Home Page', cubes});
    }); 
})

router.get('/about', (req, res) => {
    res.render('about', {title: 'About Page'});
})

module.exports = router;
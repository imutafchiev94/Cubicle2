const {Router} = require('express');

const productService = require('../services/productService');

const router = Router();

router.get('/', (req, res) => {
    let cubes = productService.getAll()
    .then(cubes => {
        res.render('index', {title: 'Home Page', cubes});
    }); 
})

module.exports = router;
const {Router} = require('express');

const productService = require('../services/productService');

const router = Router();

router.get('/create', (req, res) => {
    res.render('create', {title: 'Add Cube'});
})

router.post('/create', (req, res) => {
    productService.create(req.body)
    .then(res.redirect('/'))
    .catch(res.status(500));
})

router.get('/details/:id', async (req, res) => {
    let cube = await productService.getOne(req.params.id)
    res.render('details', {title: `${cube.name}`, cube});
    
})
module.exports = router;
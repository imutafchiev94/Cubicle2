const {Router} = require('express');

const accessoryService = require('../services/accessoryService');
const productService = require('../services/productService');

const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory', {title: 'Create Accessory'})
});

router.post('/create', (req, res) => {
    accessoryService.create(req.body)
    .then(res.redirect('/'))
    .catch(res.status(500));
});

router.get('/attach/:id', async (req, res) => {
    let accessories = await accessoryService.getAll();
    let cube = await productService.getOne(req.params.id)
    res.render('attachAccessory', {cube, accessories})
    
});

router.post('/attach/:id', (req, res) => {
    accessoryService.attach(req.body, req.params.id)
    .then(res.redirect('/'))
    .catch(res.status(500));

})

module.exports = router; 
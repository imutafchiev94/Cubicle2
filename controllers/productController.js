const {Router} = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const productService = require('../services/productService');

const router = Router();

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', {title: 'Add Cube'});
})

router.post('/create', isAuthenticated,  (req, res) => {
    productService.create(req.body, req.user)
    .then(res.redirect('/'))
    .catch(res.status(500));
})

router.get('/details/:id', async (req, res) => {
    let cube = await productService.getOne(req.params.id);
    console.log(cube);
    res.render('details', {title: `${cube.name}`, cube});
    
})

router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try{
        let cube = await productService.getOne(req.params.id);
        res.render('editCube', {cube});
    } catch (error) {
        res.redirect('/');
    }
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
    productService.update(req.params.id, req.body).
    then(response => {
        res.redirect(`/products/details/${req.params.id}`)
    });
})

router.get('/delete/:id', isAuthenticated, async (req, res) => {
    try{
        let cube = await productService.getOne(req.params.id);
        res.render('deleteCube', cube);
    } catch (error) {
        res.redirect('/');
    }
});

router.post('/delete/:id', isAuthenticated, async (req, res) => {
    productService.deleteCube(req.params.id).
    then(response => {
        res.redirect(`/`)
    });
})

module.exports = router;
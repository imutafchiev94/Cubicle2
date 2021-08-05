const {Router} = require('express');

const isAuthenticated = require('./middlewares/isAuthenticated');


const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const router = Router();


router.use('/', homeController);
router.use('/auth', authController);
router.use('/products', productController);
router.use('/accessories', isAuthenticated, accessoryController);
router.get('*', (req, res) => {
    res.render('404', {title: "Not Found"});
})

module.exports = router;
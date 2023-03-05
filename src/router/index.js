const productsController = require('../products/controller.products');
const cartsController = require('../carts/controller.carts');
const fsProductsController = require('../products/controller.fs.products');
const fsCartsController = require('../carts/controller.fs.carts ');
const realTimeProductsController = require('../realTime/controller.realTimeProducts');
const viewsController = require('../chat/controller.chat')
const usersController = require('../users/controller.users');

//----------------
const authController = require('../auth/controllers.auth');
const cookiesController = require('../cookies/controller.cookies');
const sessionController = require('../session/controller.session');
const viewsTemplateController = require('../viewsTemplate/controller.viewsTemplate')


const router = (app) => {
    app.use('/chat', viewsController)
    app.use('/api/products', productsController);
    app.use('/api/carts', cartsController);
    app.use('/api/fs/products', fsProductsController);
    app.use('/api/fs/carts', fsCartsController);
    app.use('/realTimeProducts', realTimeProductsController);


    app.use('/', viewsTemplateController);
    app.use('/auth', authController);
    app.use('/users', usersController);
    app.use('/cookies', cookiesController);
    app.use('/session', sessionController);
};

module.exports = router;
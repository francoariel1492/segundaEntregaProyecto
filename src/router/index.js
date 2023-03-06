const viewsTemplateController = require('../viewsTemplate/controller.viewsTemplate')
const authController = require('../auth/controller.auth')
const usersController = require('../users/controller.users')
const productsController = require('../products/controller.products')
const cookiesController = require('../cookies/controller.cookies')
const sessionController = require('../session/controller.session')
// const realTimeProductsController = require('../realTime/controller.realTimeProducts')
const viewsController = require('../chat/controller.chat')
const cartsController = require('../carts/controller.carts')

const router = app => {
  app.use('/', viewsTemplateController)
  app.use('/auth', authController)
  app.use('/users', usersController)
  app.use('/cookies', cookiesController)
  app.use('/session', sessionController)
  app.use('/chat', viewsController)
  // app.use('/realTimeProducts', realTimeProductsController);
  app.use('/api/products', productsController)
  app.use('/api/carts', cartsController)
}

module.exports = router
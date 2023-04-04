const viewsTemplateController = require('../viewsTemplate/controller.viewsTemplate')
const AuthController = require('../auth/controller.auth')
const usersController = require('../users/controller.users')
const productsController = require('../products/controller.products')
const cookiesController = require('../cookies/controller.cookies')
const cartsController = require('../carts/controller.carts')
const SessionRouter = require('../sessions//controller.sessions')

const authController = new AuthController()
const sessionRouter = new SessionRouter()


const router = app => {
  app.use('/', viewsTemplateController)
  app.use('/auth', authController.getRouter())
  app.use('/users', usersController)
  app.use('/cookies', cookiesController)
  app.use('/api/products', productsController)
  app.use('/api/carts', cartsController)
  app.use('/api/sessions', sessionRouter.getRouter());
}

module.exports = router
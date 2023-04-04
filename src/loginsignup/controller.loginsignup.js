const Route = require("../router/router");

const publicAcces = (req, res, next) => {
    if(req.session.user){
        return res.redirect("/api/products")
    }
    next();
}

class LoginSingupRouter extends Route {
  init() {
    this.get('/signup',  ['PUBLIC'],publicAcces, (req, res) => {
        res.render("signup")
    })

    this.get('/login', ['PUBLIC'],publicAcces, (req, res) => {
        res.render("login")
      })
  }
}

module.exports = LoginSingupRouter;
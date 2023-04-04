const Route = require("../router/router")

class SessionRouter extends Route {
  init() {
    this.get('/current', ['PUBLIC'], (req, res) => {
        if(req.session.user){
            res.status(200).json({message: 'eres usuario usando sessions como tipo de sesion'});
        }
        else{
            res.status(200).json({message: 'no eres un usuario logeado'});
        }
    })
  }
}

module.exports = SessionRouter;
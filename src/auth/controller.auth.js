const passport = require("passport");
const Route = require("../router/router");

class AuthRouter extends Route {
  init() {
    this.post(
      "/",
      ["PUBLIC"],
      passport.authenticate("login", { failureRedirect: "/auth/failLogin" }),
      async (req, res) => {
        try {
          if (!req.user)
            return res.status(400).json({ error: "Credenciales invalidas" });

          req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: "usuario",
          };

          res.redirect("/api/products");
        } catch (error) {
          res.sendServerError(`Something went wrong, ${error}`)
        }
      }
    );

    this.get("/failLogin", ["PUBLIC"], (req, res) => {
      res.json({ error: "Falló el login" });
    });

    this.get(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["user:email"] }),
      async (req, res) => {}
    );

    this.get(
      "/githubcallback",
      ["PUBLIC"],
      passport.authenticate("github", { failureRedirect: "/login" }),
      async (req, res) => {
        req.session.user = req.user;
        res.redirect("/api/products");
      }
    );
    this.get("/logout", ["PUBLIC"], (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          res.json({ msg: err });
        }
        res.redirect("/login");
      });
    });
  }
}

module.exports = AuthRouter;

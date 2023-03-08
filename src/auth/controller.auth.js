const { Router } = require("express");
const passport = require("passport");
const User = require("../models/user.model");
const { isValidPasswordMethod, createHash } = require("../utils/cryptPassword");

const router = Router();

router.post("/", passport.authenticate('login', {failureRedirect:'failLogin'}),
async (req, res) => {
  try {
    if(!req.user) return res.status(400).json({error: 'Invalid credentials'})
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email
    }

    res.redirect("/api/products");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/failLogin', (req,res) =>{
  res.json({error: "Login error"})
})

//OLD WAY WORKING
// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     const isValidPassword = isValidPasswordMethod(password, user);

//     if (!isValidPassword)
//       return res.status(400).json({
//         error:
//           "The user and the password dont match try again - controller.auth",
//       });
//     req.session.user = {
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//     };
//     if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
//       req.session.user.role = "admin";
//     } else {
//       req.session.user.role = "user";
//     }
//     res.redirect("/api/products");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });

    res.redirect("/login");
  });
});

router.patch("/forgotPassword", async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordHashed = createHash(password);
    await User.updateOne({ email }, { password: passwordHashed });
    res.json({ message: "Password updated" });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;

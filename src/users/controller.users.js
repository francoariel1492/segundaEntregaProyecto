const { Router } = require('express')
const passport = require('passport')
const User = require('../models/user.model')
const { createHash } = require('../utils/cryptPassword')

const router = Router()

//New with passport
router.post('/',passport.authenticate('register', {failureRedirect: '/failRegister'}), async (req, res) => {
  try {
    res.send({message: 'User registered'})
  } catch (error) {
    console.log(error)
    if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/failRegister', (req,res) => {
  console.log("Register failed")
  res.send({error:'Register failed'})
})

//Old way working 
// router.post('/', async (req, res) => {
//   try {
//     const { first_name, last_name, age, email, password } = req.body
//     const passwordHashed = createHash(password)
//     const newUserInfo = {
//       first_name,
//       last_name,
//       age,
//       email,
//       password : passwordHashed
//     }

//     const newUser = await User.create(newUserInfo)

//     res.redirect('/login')
//   } catch (error) {
//     console.log(error)
//     if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
//     res.status(500).json({ error: 'Internal server error' })
//   }
// })



module.exports = router
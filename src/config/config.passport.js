// const passport = require("passport");
// const local = require("passport-local");
// const User = require("../dao/mongo/models/user.model");
// const { createHash, isValidPasswordMethod } = require("../utils/cryptPassword");
// const GithubStrategy = require('passport-github2')
// const LocalStrategy = local.Strategy;
// const {clientID, clientSecret} = require('./config.github')
// const {port} = require('./app.config')

// const initializePassport = () => {
//   passport.use(
//     "register",
//     new LocalStrategy(
//       { passReqToCallback: true, usernameField: "email" },
//       async (req, username, password, done) => {
//         const { first_name, last_name, email, age } = req.body;
//         try {
//           const user = await User.findOne({ email: username });
//           if (user) {
//             console.log("The user already exist");
//             return done(null, false);
//           }

//           const newUserInfo = {
//             first_name,
//             last_name,
//             email,
//             age,
//             password: createHash(password),
//           };
//           const newUser = await User.create(newUserInfo);
//           return done(null, newUser);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     const user = await User.findById(id);
//     done(null, user);
//   });
//   passport.use(
//     "login",
//     new LocalStrategy(
//       { usernameField: "email" },
//       async (username, password, done) => {
//         try {
//           const user = await User.findOne({ email: username });
//           if (!user) {
//             console.log("User doesnt exist");
//             return done(null, false);
//           }
//           if (!isValidPasswordMethod(password, user)) return done(null, false);

//           return done(null, user);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );
//   passport.use('github', new GithubStrategy({
//     clientID,
//     clientSecret,
//     callbackURL: `http://localhost:${port}/auth/githubcallback`
//   }, async(accessToken, refreshToken, profile, done) => {
//     try {
//       const user = await User.findOne({email: profile._json.email})
//       if(!user){
//         const newUserInfo = {
//           first_name: profile._json.name,
//           last_name: '',
//           age: 18,
//           email: profile._json.email,
//           password: ''
//         }

//         const newUser = await User.create(newUserInfo)

//         return done(null,newUser)
//       }
//       done(null, user)
//     } catch (error) {
//       done(error)
//     }
//   }))
// };

// module.exports = initializePassport;

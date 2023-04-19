import bcrypt from "bcrypt";
import { userModel } from "../models/mongoModels/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { sendMail } from "../utils/sendMail.js";
import { registrationMailTemplate } from "../templates/mail/registrationMailTemplate.js";

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

const signupAuthStrategy = (passport) => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const userFound = await userModel.findById(id).exec();
      return done(null, userFound);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(
    "signupStrategy",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },

      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (user)
            return done(null, false, {
              message: "The user is already registered.",
            });
          const newUser = {
            email: username,
            password: createHash(password),
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            phone: req.body.phone,
            avatar: req.body.avatar,
            isAdmin: req.body.isAdmin,
            address: {
              street: req.body.address.street,
              number: req.body.address.number,
              city: req.body.address.city,
              stateOrProvince: req.body.address.stateOrProvince,
              zipCode: req.body.address.zipCode,
              country: req.body.address.country,
              additionalReferences: req.body.address.additionalReferences,
            },
          };
          const userCreated = await userModel.create(newUser);
          const subject = `New User Registration: ${newUser.email}.`;
          const html = registrationMailTemplate(newUser);
          sendMail(subject, html);
          return done(null, userCreated, {
            message: "User registered successfully.",
          });
        } catch (error) {
          return done(null, false, {
            message: `Error authenticating the user: ${error}`,
          });
        }
      }
    )
  );
};

export { signupAuthStrategy };

import bcrypt from "bcrypt";
import { userModel } from "../models/mongoModels/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { logger } from "../logs/logger.js";

const loginAuthStrategy = (passport) => {
  const isValidPassword = (user, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  passport.use(
    "loginStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const userFound = await userModel.findOne({ email: username });
          if (!userFound) {
            logger.error("User not found.");
            return done(null, false, {
              message: "Sorry, we couldn't find your user account.",
            });
          }
          const validPassword = await isValidPassword(userFound, password);
          if (!validPassword) {
            logger.error("Invalid password.");
            return done(null, false, {
              message: "Please check your password and try again.",
            });
          }
          return done(null, userFound);
        } catch (error) {
          logger.error(error);
          return done(error);
        }
      }
    )
  );
};

export { loginAuthStrategy };

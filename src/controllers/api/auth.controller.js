import passport from "passport";
import { signupAuthStrategy } from "../../auth/signup.js";
import { loginAuthStrategy } from "../../auth/login.js";

loginAuthStrategy(passport);
signupAuthStrategy(passport);

class AuthController {
  static postSignupPassport = passport.authenticate("signupStrategy", {
    failureRedirect: "/api/auth/signupError",
    failureMessage: true,
  });

  static postSignup(req, res) {
    res.send("User registered and authenticated.");
  }

  static signupError(req, res) {
    try {
      const errorMessage = req.session.messages[0] || "";
      req.session.messages = [];
      res.json({ error: errorMessage });
    } catch (error) {
      res.json({ message: error });
    }
  }

  static postLoginPassport = passport.authenticate("loginStrategy", {
    failureRedirect: "/api/auth/loginError",
    failureMessage: true,
  });

  static postLogin(req, res) {
    res.send("User authenticated.");
  }

  static logout(req, res) {
    req.logOut((err) => {
      if (err) return res.status(400).json({ error: "Could not log out." });
      req.session.destroy((err) => {
        if (err) return res.status(400).json({ error: "Error logging out." });
        res.status(200).json({ message: "Session ended." });
      });
    });
  }
}

export { AuthController };

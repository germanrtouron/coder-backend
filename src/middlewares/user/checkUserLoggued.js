export const checkUserLoggued = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ error: "Please log in to access your account." });
  }
};

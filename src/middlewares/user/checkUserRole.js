export const checkUserRole = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      error: "Unauthorized.",
      message:
        "Your account does not have sufficient permissions to perform this action. Please contact an administrator for assistance.",
    });
  }
};

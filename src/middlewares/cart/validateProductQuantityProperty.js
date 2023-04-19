export const validateProductQuantityProperty = (req, res, next) => {
  const bodyProps = Object.keys(req.body);
  if (bodyProps.length !== 1 || bodyProps[0] !== "quantity") {
    res.status(400).json({
      status: "ERROR",
      message: 'The request body must contain only the "quantity" property.',
    });
  } else {
    next();
  }
};

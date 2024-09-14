// Promises format
//requestHandler is a function passed as argument
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    return Promise.resolve(requestHandler(req, res, next)).catch((err) =>
      next(err)
    );
  };
};

export { asyncHandler };

// try catch format
// this is a wrapper function
const asyncHandlerr = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(err.code || 60).json({
      success: false,
      message: err.message,
    });
  }
};

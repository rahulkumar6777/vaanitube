export const returnError = (res, error) => {
  return res.status(error.status || 500).json({
    message: error.msg || "Internal server Error"
  });
};

const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let custonError = {
    //set Default
    statusCode: err.statuCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something really went wrong please try agian later",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  if (err.name == "ValidationError") {
    custonError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    custonError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    custonError.msg = `Duplicate Value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    custonError.statusCode = 400;
  }

  if (err.name === "CastError") {
    custonError.msg = `No item found with ${err.value} id`;
    custonError.statusCode = 404;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(custonError.statusCode).json({ msg: custonError.msg });
};

module.exports = errorHandlerMiddleware;

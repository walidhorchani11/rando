const sendErrorProd = (error, res) => {
  // send minim of information
  // test if we have trusted error isOperational is true or other
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    //not trusted error
    res.status(500).json({
      status: 'error',
      message: 'somthing went very wrong',
    });
  }
};

const sendErrorDev = (error, res) => {
  // en mode development, send max info
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error,
  });
};

module.exports = (error, req, res, next) => {
  console.log(error.stack);
  error.status = error.status || 'fail';
  error.statusCode = error.statusCode || 500;
  sendErrorDev(error, res);
  // if (process.env.NODE_ENV !== 'production') {
  //   sendErrorProd(error, res);
  // } else {
  //   sendErrorDev(error, res);
  // }
};

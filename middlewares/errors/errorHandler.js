const mainErrorHandler = async (err, req, res, next) => {
  try {
    // TODO: Separate log level by Winston.
    switch (err.status) {
      default:
        throw err;
      case 400:
        console.log('----------------------------------------------------------------------');
        console.log(`[${new Date().toLocaleString()}] Client argument error with 400`);
        console.log('----------------------------------------------------------------------');
        break;
      case 401:
        // TODO : Add a Client IP.
        console.log('No Authorized');
        break;
      case 404:
        console.log(`Client request Error : 404 (${req.baseURI})`);
        break;
    }
  } catch (internalError) {
    // TODO: Separate log level by Winston.
    console.log('Unexpected Error Occured');
  } finally {
    res.status(err.status);
    res.json({
      message: err.message,
    });
  }
};

module.exports = mainErrorHandler;

function thisMethodShouldBeOk(logger) {
  // This should be a valid method.
  var a = 0;
  var b = 1;

  if (a === b) {
    logger.log('A is equal to B.');
  } else {
    logger.log('A is not equal to B.');
  }
}

module.exports = thisMethodShouldBeOk;

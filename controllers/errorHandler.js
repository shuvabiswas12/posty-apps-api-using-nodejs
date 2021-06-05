//
/** Error handling starts in mongoose */

exports.handlingErrors = function (err) {
  if (err.name === "ValidationError") {
    let error = {}
    Object.keys(err.errors).forEach((key) => {
      error[key] = err.errors[key].message
    })
    return error
  }
}

/** Error handling ends in mongoose */
//

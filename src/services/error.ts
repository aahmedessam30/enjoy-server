function GenerateError({ message, code, errors = [] }) {
  const error: any = new Error(message)
  error.statusCode = code
  if (errors) {
    error.errors = errors
  }
  throw error
}

function CatchError(err, next) {
  if (!err?.statusCode) {
    err.statusCode = 500
  }
  next(err)
}

function SocketError({ message, code, errors = [] }) {
  const error: any = new Error()
  error.statusCode = code
  error.message = message
  error.errors = errors
  throw error
}

export { GenerateError, CatchError, SocketError }

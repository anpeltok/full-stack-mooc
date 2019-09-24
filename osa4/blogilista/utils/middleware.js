const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer ')){
    req.token = auth.substring(7)
  }
  next()
}

const errorHandler = (err, req, res, next) => {
  if(err.name === 'CastError' && err.kind === 'ObjectId'){
    return res.status(400).send({ err: 'malformatted id' })
  }
  else if(err.name === 'ValidationError'){
    return res.status(400).json({ err: err.message })
  }
  else if(err.name === 'JsonWebTokenError'){
    return res.status(401).json({ err: 'invalid token' })
  }
  next(err)
}

module.exports = {
  tokenExtractor, errorHandler
}
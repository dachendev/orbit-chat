const jwt = require('jsonwebtoken')

const getToken = (request) => {
  const authHeader = request.get('Authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}

const authMiddleware = (request, response, next) => {
  const token = getToken(request)

  if (!token) {
    response.status(401).json({ error: 'token invalid' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    request.user = decoded
    next()
  } catch (err) {
    response.status(401).json({ error: 'token invalid' })
  }
}

module.exports = authMiddleware

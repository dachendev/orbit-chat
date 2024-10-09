const sseMiddleware = (options = {}) => {
  const { keepAliveInterval = 5000 } = options

  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  }

  return (request, response, next) => {
    response.writeHead(200, headers)

    const comment = (comment) => response.write(`: ${comment}\n`)
    const field = (name, value) => response.write(`${name}: ${value}\n`)
    const event = (type) => field('event', type)
    const data = (data) => field('data', data)
    const dispatch = () => response.write('\n')

    setInterval(() => {
      comment('keep-alive')
      dispatch()
    }, keepAliveInterval)

    response.sse = {
      comment,
      field,
      event,
      data,
      dispatch,
    }

    next()
  }
}

module.exports = sseMiddleware

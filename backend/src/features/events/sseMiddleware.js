const sseMiddleware = (options = {}) => {
  const { keepAliveInterval = 15000 } = options

  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  }

  return (request, response, next) => {
    response.writeHead(200, headers)

    let buffer = []

    const write = (data) => buffer.push(data) && response.sse

    const comment = (comment) => write(`: ${comment}\n`)
    const field = (name, value) => write(`${name}: ${value}\n`)
    const event = (type) => field('event', type)
    const data = (data) => field('data', data)

    const dispatch = () => {
      if (buffer.length > 0) {
        response.write(buffer.join('') + '\n')
        buffer = []
      }
      return response.sse
    }

    const intervalId = setInterval(() => {
      comment('keep-alive').dispatch()
    }, keepAliveInterval)

    request.on('close', () => {
      clearInterval(intervalId)
    })

    response.sse = {
      buffer,
      write,
      comment,
      field,
      event,
      data,
      dispatch,
    }

    response.sse.comment('stream').dispatch()

    next()
  }
}

module.exports = sseMiddleware

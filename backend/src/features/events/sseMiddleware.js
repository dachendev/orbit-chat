const stringify = (value) =>
  typeof value === 'object' ? JSON.stringify(value) : value

const sseMiddleware = (options = {}) => {
  const { keepAliveInterval = 30000 } = options

  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  }

  return (request, response, next) => {
    response.writeHead(200, headers)

    const comment = (comment) => response.write(`: ${comment}\n\n`)

    const event = (event, data) =>
      response.write(`event: ${event}\ndata: ${stringify(data)}\n\n`)

    const data = (data) => response.write(`data: ${stringify(data)}\n\n`)

    comment('stream')

    const intervalId = setInterval(() => {
      comment('keep-alive')
    }, keepAliveInterval)

    request.on('close', () => {
      clearInterval(intervalId)
    })

    response.sse = {
      comment,
      event,
      data,
    }

    next()
  }
}

module.exports = sseMiddleware

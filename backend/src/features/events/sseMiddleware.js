const ensureString = (value) =>
  typeof value === 'string' ? value : JSON.stringify(value)

const sseHeaders = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
}

const sseMiddleware = (options = {}) => {
  return (request, response, next) => {
    response.writeHead(200, sseHeaders)

    const send = (data) => response.write(`data: ${ensureString(data)}`)

    const sendEvent = (event, data) =>
      response.write(`event: ${event}\ndata: ${ensureString(data)}`)

    const close = () => response.end()

    response.sse = {
      send,
      sendEvent,
      close,
    }

    next()
  }
}

module.exports = sseMiddleware

// Import required modules
const { compose } = require('compose-middleware')

/**
 * Creates a pub/sub broker for managing topics and subscriptions.
 * @returns {Object} An object with methods to manage subscriptions and publish events.
 */
const createBroker = () => {
  const subscriptions = new Map()

  return {
    subscribe(topic, callback) {
      if (!subscriptions.has(topic)) {
        subscriptions.set(topic, new Map())
      }
      const id = Symbol()
      subscriptions.get(topic).set(id, callback)
      return id
    },

    unsubscribe(topic, id) {
      const topicSubscriptions = subscriptions.get(topic)
      if (topicSubscriptions) {
        topicSubscriptions.delete(id)
        if (topicSubscriptions.size === 0) {
          subscriptions.delete(topic)
        }
      }
    },

    unsubscribeAll() {
      subscriptions.forEach((topicSubscriptions, topic) => {
        topicSubscriptions.forEach((_, id) => this.unsubscribe(topic, id))
      })
    },

    publish(topic, data) {
      const topicSubscriptions = subscriptions.get(topic)
      if (topicSubscriptions && topicSubscriptions.size > 0) {
        topicSubscriptions.forEach((callback) => callback(data))
      }
    },
  }
}

/**
 * Middleware for setting up Server-Sent Events (SSE).
 * @param {Object} options - Configuration options.
 * @param {number} [options.heartbeatInterval=30000] - Interval for sending heartbeat messages.
 * @returns {Function} Express middleware function.
 */
const sseMiddleware = (options = {}) => {
  const heartbeatInterval = options.heartbeatInterval || 30000

  return (req, res, next) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    })

    const sse = {
      comment: (text) => {
        res.write(`: ${text}\n\n`)
      },
      send: (data) => {
        const dataString =
          typeof data === 'object' ? JSON.stringify(data) : data
        res.write(`data: ${dataString}\n\n`)
      },
    }

    sse.comment('stream')

    const heartbeat = setInterval(() => {
      sse.comment('heartbeat')
    }, heartbeatInterval)

    req.on('close', () => {
      clearInterval(heartbeat)
    })

    req.sse = sse
    next()
  }
}

/**
 * Middleware for integrating SSE with a broker.
 * @param {Object} broker - The broker object created by createBroker().
 * @param {Object} options - Configuration options for sseMiddleware.
 * @returns {Function} Composed middleware function.
 */
const sseBrokerMiddleware = (broker, options = {}) => {
  const brokerMiddleware = (req, res, next) => {
    const subscriptions = new Map()

    const nextSSE = {
      ...req.sse,
      subscribe: (topic, callback) => {
        const id = broker.subscribe(topic, callback)
        subscriptions.set(topic, id)
        return id
      },
      unsubscribe: (topic, id) => {
        broker.unsubscribe(topic, id)
        subscriptions.delete(topic)
      },
      unsubscribeAll: () => {
        subscriptions.forEach((id, topic) => broker.unsubscribe(topic, id))
        subscriptions.clear()
      },
      publish: broker.publish,
    }

    req.on('close', nextSSE.unsubscribeAll)

    req.sse = nextSSE
    next()
  }

  return compose([sseMiddleware(options), brokerMiddleware])
}

/**
 * Extends an Express app with SSE functionality.
 * @param {Object} router - Express router object.
 * @param {Object} options - Configuration options for sseMiddleware.
 * @returns {Object} Extended router and broker methods.
 */
const expressSSE = (router, options = {}) => {
  const broker = createBroker()

  router.sse = (path, ...args) => {
    const handler = args.pop()
    const middlewares = args

    middlewares.push(sseBrokerMiddleware(broker, options))

    router.get(path, ...middlewares, (req, res, next) => {
      handler(req.sse, req, res, next)
    })
  }

  return {
    router,
    publish: broker.publish,
  }
}

module.exports = {
  expressSSE,
  sseMiddleware,
  sseBrokerMiddleware,
  createBroker,
}

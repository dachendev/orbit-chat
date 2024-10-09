const createPubSub = () => {
  const topics = new Map()

  const unsubscribe = (topic, callback) => {
    if (topics.has(topic)) {
      topics.get(topic).delete(callback)
      if (topics.get(topic).size === 0) {
        topics.delete(topic)
      }
    }
  }

  const subscribe = (topic, callback) => {
    if (!topics.has(topic)) {
      topics.set(topic, new Set())
    }
    topics.get(topic).add(callback)
    return () => unsubscribe(topic, callback)
  }

  const publish = (topic, data) => {
    if (topics.has(topic)) {
      topics.get(topic).forEach((callback) => callback(data))
    }
  }

  return {
    unsubscribe,
    subscribe,
    publish,
  }
}

module.exports = { createPubSub }

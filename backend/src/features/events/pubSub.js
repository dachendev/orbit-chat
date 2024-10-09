export const createPubSub = () => {
  const topics = new Map()

  const subscribe = (topic, callback) => {
    if (!topics.has(topic)) {
      topics.set(topic, [])
    }
    topics.get(topic).push(callback)
  }

  const publish = (topic, data) => {
    if (topics.has(topic)) {
      topics.get(topic).forEach((callback) => callback(data))
    }
  }

  return {
    subscribe,
    publish,
  }
}

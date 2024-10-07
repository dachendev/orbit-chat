import { startOfDay, toDate } from 'date-fns'

export const sortByDate = (arr, dateKey) => {
  return arr.toSorted(
    (a, b) => toDate(a[dateKey]).getTime() - toDate(b[dateKey]).getTime()
  )
}

export const groupMessages = (messages) => {
  // 1. group messages by day
  const groups = messages.reduce((obj, message) => {
    const timestamp = startOfDay(message.createdAt).getTime()

    if (obj[timestamp] === undefined) {
      obj[timestamp] = []
    }

    obj[timestamp].push(message)

    return obj
  }, {})

  // 2. convert to array
  // 3. sort messages within each group
  const groupArray = Object.entries(groups).map(([timestamp, messages]) => {
    const date = new Date(Number(timestamp))
    return {
      date,
      messages: sortByDate(messages, 'createdAt'),
    }
  })

  // 4. sort groups
  return sortByDate(groupArray, 'date')
}

const defaults = { time: '', capital: '', positions: '{}' }

const getItem = ({ key }) => {
  let value = localStorage.getItem(key)

  if (!value) {
    localStorage.setItem(key, defaults[key])
    value = defaults[key]
  }

  try {
    value = JSON.parse(value)
  } catch (err) {
    //
  }

  return value
}

const setItem = ({ key, item }) => {
  let newItem = item

  if (typeof newItem === 'object') {
    newItem = JSON.stringify(item)
  }

  localStorage.setItem(key, newItem)
}

export default {
  getItem,
  setItem,
  updateStore: (newPositions) => {
    const formattedPositions = Object.keys(newPositions).reduce(
      (sum, symbol) => {
        sum[symbol] = {
          percentage: newPositions[symbol].percentage,
        }
        return sum
      },
      {}
    )
    setItem({ key: 'positions', item: formattedPositions })
  },
}

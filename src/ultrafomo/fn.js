import moment from 'moment'
import wA from 'weighted-average'
import numeral from 'numeral'
import palettes from 'nice-color-palettes'
import interpolate from 'color-interpolate'
import store from './store'

const getPositions = (positions) => {
  Object.keys(positions).forEach((symbol) => {
    const stats = getStats({ symbol, positions })
    const coords = getCoords({ stats })
    const dataset = getDataset({ symbol, stats, coords })
    positions[symbol] = {
      ...stats,
      coords,
      dataset,
    }
  })

  return positions
}
const getStock = async ({ symbol, positions }) => {
  // return existing stock
  const { stock } = positions[symbol] || {}
  if (stock) return stock

  // make network request for stock
  let response = await fetch(
    `https://0zqs2xabdg.execute-api.ca-central-1.amazonaws.com/fuck?symbol=${symbol}`
  )
  if (!response.ok) throw Error(`Couldn't find stock ${symbol}.`)
  response = await response.json()

  return response
}
const getStats = ({ symbol, positions }) => {
  const position = positions[symbol]
  const { stock } = position
  const timeOption = store.getItem({ key: 'time' })
  const capitalOption = store.getItem({ key: 'capital' })

  let time = moment().subtract(timeOption, 'years').format('YYYY-MM-DD')
  let startIndex = 0
  loop1: for (let j = 0; j < 10; j++) {
    for (let i = 0; i < stock.data.length; i++) {
      const item = stock.data[i]
      if (item.date === time) {
        startIndex = i
        break loop1
      }
    }
    if (startIndex !== 0) break
    time = moment(time).add(1, 'days').format('YYYY-MM-DD')
  }

  if (timeOption > 20 || startIndex === 0) startIndex = stock.data.length

  let range = stock.data.slice(0, startIndex + 1).reverse()
  const startPrice = range[0].price
  const endPrice = range[range.length - 1].price

  range = range.map((item) => {
    const profit = item.price - startPrice
    const roi = profit / startPrice
    item.roi = roi
    item.profit = profit
    return item
  })

  const days = moment(range[range.length - 1].date).diff(range[0].date, 'days')
  const years = days / 365
  const remainingDays = days % 365
  let timespan = `${Math.floor(years)} Year${
    Math.floor(years) === 1 ? '' : 's'
  }`
  if (remainingDays)
    timespan += `, ${remainingDays} Day${remainingDays === 1 ? '' : 's'}`

  const percentage = positions[symbol].percentage || 0
  const alloc = capitalOption * percentage
  const shares = Math.floor(alloc / startPrice)
  const startMktValue = shares * startPrice
  const endMktValue = shares * endPrice
  const dividends = range.reduce((sum, cur) => sum + cur.dividend, 0) * shares
  const profit = (endPrice - startPrice) * shares
  const roi = profit / alloc || 0
  const annualized = ((1 + roi / 100) ** (365 / days) - 1) * 100

  const getColor = interpolate(palettes[32])
  const { length } = Object.keys(positions)
  const gradient = Array.from({ length }, (v, i) => getColor(i / length))
  const usedColors = Object.keys(positions).map(
    (symbol) => positions[symbol].color
  )
  const availableColors = gradient.filter(
    (color) => !usedColors.includes(color)
  )
  const color = positions[symbol].color || availableColors.shift()

  return {
    stock,
    symbol,
    shares,
    dividends,
    profit,
    roi,
    percentage,
    timespan,
    startMktValue,
    endMktValue,
    annualized,
    range,
    color,
    formatted: {
      profit: numeral(profit).format('$0,0.00'),
      roi: numeral(roi).format('0,.00%'),
      percentage: numeral(percentage).format('0,.00%'),
      annualized: numeral(annualized).format('0,.00%'),
      dividends: numeral(dividends).format('$0,0.00'),
    },
  }
}
const getCoords = ({ stats }) => {
  const coords = stats.range.map((item) => ({
    y: item.roi * 100,
    x: moment(item.date).valueOf(),
  }))
  return coords
}
const getDataset = ({ symbol, stats, coords }) => ({
  borderColor: stats.color,
  pointBackgroundColor: stats.color,
  pointHoverBorderColor: '#fff',
  pointHoverBorderWidth: 2,
  lineTension: 0.1,
  fill: false,
  borderWidth: 2,
  pointHitRadius: 20,
  pointHoverRadius: 3,
  pointRadius: 0,
  label: symbol,
  data: coords,
})
const defer = ((timer) => (callback, ms) => {
  clearTimeout(timer)
  timer = setTimeout(callback, ms)
})()
const getTotals = (positions) => {
  const totalProfit = () => {
    const totalProfit = Object.keys(positions).reduce(
      (sum, cur) => (sum += positions[cur].profit),
      0
    )
    return numeral(totalProfit).format('$0,0.00')
  }
  const totalRoi = () => {
    const formattedPositions = Object.keys(positions).map((key) => ({
      val: positions[key].roi,
      weight: positions[key].percentage,
    }))
    const weightedAverage = wA(formattedPositions)
    return numeral(weightedAverage).format('0,.00%')
  }
  const totalAnnualizedRoi = () => {
    const formattedPositions = Object.keys(positions).map((key) => ({
      val: positions[key].annualized,
      weight: positions[key].percentage,
    }))
    const weightedAverage = wA(formattedPositions)
    return numeral(weightedAverage).format('0,.00%')
  }
  const totalPercentage = () => {
    const totalPercentage = Object.keys(positions).reduce(
      (sum, cur) => (sum += positions[cur].percentage),
      0
    )
    return numeral(totalPercentage).format('0.00%')
  }
  const totalDividends = () => {
    const totalDividends = Object.keys(positions).reduce(
      (sum, cur) => (sum += positions[cur].dividends),
      0
    )
    return numeral(totalDividends).format('$0,0.00')
  }
  return {
    totalProfit: totalProfit(),
    totalRoi: totalRoi(),
    totalAnnualizedRoi: totalAnnualizedRoi(),
    totalPercentage: totalPercentage(),
    totalDividends: totalDividends(),
  }
}

export default {
  getPositions,
  getStock,
  defer,
  getTotals,
}

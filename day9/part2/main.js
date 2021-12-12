const fs = require("fs")
const _ = require("lodash")

const inputs = fs
  .readFileSync("input_data.txt")
  .toString("utf8")
  .split(/\r?\n/)
  .map((l) => l.split("").map((i) => Number.parseInt(i)))

const neighbors = (x, y) => {
  if (!Number.isInteger(inputs[y][x])) {
    return []
  }

  const around = []
  if (x > 0) {
    around.push({ x: x - 1, y, h: inputs[y][x - 1] })
  }
  if (x < inputs[0].length - 1) {
    around.push({ x: x + 1, y, h: inputs[y][x + 1] })
  }
  if (y > 0) {
    around.push({ x, y: y - 1, h: inputs[y - 1][x] })
  }
  if (y < inputs.length - 1) {
    around.push({ x, y: y + 1, h: inputs[y + 1][x] })
  }
  return around
}

const is_low = (x, y) =>
  neighbors(x, y).every((near_height) => inputs[y][x] < near_height.h) ? { x, y, h: inputs[y][x] } : null

const map_x = inputs[0].length
const map_y = inputs.length

const low = _(_.range(0, map_y))
  .map((x) => _.range(0, map_x).map((y) => is_low(x, y)))
  .flatMap()
  .filter()
  .map(({ h }) => h + 1)
  .sum()

const flood = (x, y, basin) => {
  if (inputs[y][x] === 9 || !Number.isInteger(inputs[y][x])) {
    return
  }
  const locs = neighbors(x, y)
  inputs[y][x] = basin
  locs.forEach(({ x, y }) => flood(x, y, basin))
}

_(_.range(0, map_y))
  .map((x) => _.range(0, map_x).map((y) => is_low(x, y)))
  .flatMap()
  .filter()
  .forEach(({ x, y }, i) => flood(x, y, `b${i}`))

const largest = _(inputs)
  .flatMap()
  .countBy()
  .map((value, prop) => ({ prop, value }))
  .filter((l) => l.prop != "9")
  .map((l) => l.value)
  .sort((a, b) => a - b)
  .reverse()
  .slice(0, 3)
  .reduce((acc, x) => acc * x)

console.log(largest)

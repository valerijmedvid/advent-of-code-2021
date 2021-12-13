fs = require("fs")
let input = ""
try {
  input = fs
    .readFileSync("./input_data.txt", "utf8")
    .split(",")
    .map((x) => parseInt(x))
} catch (err) {
  console.error(err)
}

minPos = Math.min(...input)
maxPos = Math.max(...input)

let positions = []
for (let pos = minPos; pos <= maxPos; pos++) {
  positions.push(0)
}

for (let i = 0; i < positions.length; i++) {
  input.forEach((x) => {
    diff = Math.abs(i - x)
    fuel = 0
    for (let cost = 1; cost <= diff; cost++) {
      fuel += cost
    }
    positions[i] += fuel
  })
}

positions.forEach((x) => {})

console.log(Math.min(...positions))

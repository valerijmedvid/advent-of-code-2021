const fs = require("fs")

const INPUTS = fs
  .readFileSync("input_data.txt", "utf8")
  .split("\n")
  .map((a) => a.split(""))

const CHARS = {
  open: ["(", "[", "<", "{"],
  close: [")", "]", ">", "}"],
}

const POINTS = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
}

let score = []

for (let line of INPUTS) {
  let close = []
  for (let bracket of line) {
    if (CHARS.open.includes(bracket)) {
      close.unshift(CHARS.close[CHARS.open.indexOf(bracket)])
    } else if (bracket == close[0]) {
      close.shift()
    } else {
      score.push(bracket)
      break
    }
  }
}

console.log(score.map((x) => POINTS[x]).reduce((prev, curr) => prev + curr, 0))

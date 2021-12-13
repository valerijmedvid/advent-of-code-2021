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
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
}

let score = []

for (let line of INPUTS) {
  let incomplete = true
  let close = []
  for (let bracket of line) {
    if (CHARS.open.includes(bracket)) {
      close.unshift(CHARS.close[CHARS.open.indexOf(bracket)])
    } else if (bracket == close[0]) {
      close.shift()
    } else {
      incomplete = false
    }
  }
  if (incomplete) {
    score.push(close)
  }
}

result = score
  .map((line) => {
    console.log(line)
    return line
      .map((x) => POINTS[x])
      .reduce((curr, prev) => {
        return curr * 5 + prev
      }, 0)
  })
  .sort((e, f) => e - f)

console.log(result[Math.floor(result.length / 2)])

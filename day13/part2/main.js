const fs = require("fs")

const INPUTS = fs.readFileSync("input_data.txt", "utf8").split(/^\n/m)

let maps = INPUTS[0]
  .split("\n")
  .filter(Boolean)
  .map((x) => x.split(",").map((y) => parseInt(y)))

let folds = INPUTS[1].split("\n").map((x) => x.replace("fold along ", "").split("="))

let paper = []
let maxCol = 0
let maxLine = 0

function createArray(lines, columns) {
  arr = []
  for (let l = 0; l <= lines; l++) {
    arr.push([])
    for (let c = 0; c <= columns; c++) {
      arr[l].push(" ")
    }
  }
  return arr
}

function fold(axis, num) {
  if (axis == "y") {
    maps = maps.map((x) => {
      if (x[1] > num) {
        return [x[0], num - (x[1] - num)]
      } else {
        return [x[0], x[1]]
      }
    })
  } else {
    maps = maps.map((x) => {
      if (x[0] > num) {
        return [num - (x[0] - num), x[1]]
      } else {
        return [x[0], x[1]]
      }
    })
  }
}

folds.forEach((axis) => {
  fold(axis[0], axis[1])
})

maps.map((x) => {
  if (x[0] > maxCol) {
    maxCol = x[0]
  }
  if (x[1] > maxLine) {
    maxLine = x[1]
  }
})
paper = createArray(maxLine, maxCol)
maps.forEach((x) => {
  paper[x[1]][x[0]] = "#"
})
paper.forEach((x) => {
  console.log(...x)
})

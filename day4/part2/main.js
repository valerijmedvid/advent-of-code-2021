fs = require("fs")
let input = ""
try {
  input = fs.readFileSync("./input_data.txt", "utf8")
} catch (err) {
  console.error(err)
}

function getParsedBingo(bingo) {
  let raw_rows = bingo.split("\n")
  let rows = raw_rows.map((x) => {
    return x.split(" ").filter((y) => y)
  })

  let columns = []
  for (let i = 0; i < 5; i++) {
    let column = []
    for (let y = 0; y < 5; y++) {
      column[y] = rows[y][i]
    }
    columns.push(column)
  }

  return rows.concat(columns)
}

function prepareBingoForGame(bingo) {
  bingoDict = bingo.map((x) => {
    line = x.map((y) => {
      return { number: y, drawn: false }
    })
    return line
  })
  return bingoDict
}

function checkNumber(line, draw) {
  line.forEach((num) => {
    if (num.number == draw) {
      num.drawn = true
    }
  })
}

function isWinLine(line) {
  isWin = true
  line.forEach((num) => {
    if (num.drawn == false) {
      isWin = false
    }
  })
  return isWin
}

function getNoteSelectedNumber(bingo) {
  let nums = []

  bingo.forEach((line) => {
    line
      .filter((x) => {
        return x.drawn == false
      })
      .forEach((x) => {
        nums.push(x.number)
      })
  })

  return new Set(nums)
}

function sumNumbers(numbers) {
  let sum = 0
  numbers.forEach((x) => {
    sum += parseInt(x)
  })
  return sum
}

let drawnNumbers = input.split("\n")[0].split(",")
let inputBingo = input.split("\n\n").slice(1)

parsedBingo = inputBingo.map((x) => {
  return getParsedBingo(x)
})

parsedBingo = parsedBingo.map((x) => {
  return prepareBingoForGame(x)
})

let winnerBingo = null
let winnerNumber = null
let breakVilik = false

let newBingos = [...parsedBingo]

try {
  drawnNumbers.forEach((draw) => {
    winnerNumber = draw
    parsedBingo = [...newBingos]
    for (let i = 0; i < parsedBingo.length; i++) {
      if (breakVilik) throw Error
      for (let y = 0; y < parsedBingo[i].length; y++) {
        checkNumber(parsedBingo[i][y], draw)
        if (isWinLine(parsedBingo[i][y])) {
          if (parsedBingo.length > 1) {
            newBingos.splice(i, 1)
          } else {
            winnerBingo = [...parsedBingo]
            breakVilik = true
          }
        }
      }
    }
  })
} catch (e) {}

console.log(winnerBingo)

numbers = getNoteSelectedNumber(winnerBingo[0])

let sumOfNumbers = sumNumbers(numbers)
console.log(sumOfNumbers)
console.log(winnerNumber)
console.log(sumOfNumbers * winnerNumber)
